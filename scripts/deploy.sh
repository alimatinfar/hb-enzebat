#!/usr/bin/env bash
# ============================================================================
#  deploy.sh — دیپلوی امن hb-enzebat روی سرور (تک‌سرور، pm2)
#
#  اجرا:  cd /var/www/hb-enzebat && ./scripts/deploy.sh
#  یا:    npm run deploy
#
#  اصول ایمنی:
#   1) قبل از هر تغییر روی دیتابیس، یک بکاپ کامل (pg_dump) گرفته می‌شود.
#   2) فقط `prisma migrate deploy` اجرا می‌شود (هرگز dev / reset / db push).
#   3) اگر بیلد شکست بخورد، pm2 ری‌استارت نمی‌شود؛ نسخه قبلی بالا می‌ماند.
#   4) هر مرحله لاگ می‌شود؛ با شکست هر مرحله، دیپلوی همان‌جا متوقف می‌شود.
#
#  تنظیمات اختیاری در فایل .deploy.env کنار همین پروژه (در گیت نیست):
#     BRANCH=master
#     PM2_APP=1
#     HEALTH_URL=http://127.0.0.1:3000
#     BACKUP_KEEP=10
#     SKIP_PULL=0
#     SKIP_BACKUP=0
# ============================================================================
set -Eeuo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# ---------------------------- پیش‌فرض‌ها -----------------------------------
BRANCH="${BRANCH:-master}"
REMOTE="${REMOTE:-origin}"
PM2_APP="${PM2_APP:-1}"
HEALTH_URL="${HEALTH_URL:-}"
HEALTH_RETRIES="${HEALTH_RETRIES:-20}"
HEALTH_INTERVAL="${HEALTH_INTERVAL:-3}"
BACKUP_DIR="${BACKUP_DIR:-$APP_DIR/backups}"
BACKUP_KEEP="${BACKUP_KEEP:-10}"
SKIP_PULL="${SKIP_PULL:-0}"
SKIP_BACKUP="${SKIP_BACKUP:-0}"

if [ -f "$APP_DIR/.deploy.env" ]; then
  set -a
  # shellcheck disable=SC1091
  . "$APP_DIR/.deploy.env"
  set +a
fi

cd "$APP_DIR"
mkdir -p "$BACKUP_DIR" "$APP_DIR/logs"

LOG_FILE="$APP_DIR/logs/deploy-$(date +%Y%m%d-%H%M%S).log"
exec > >(tee -a "$LOG_FILE") 2>&1

log()  { printf '\n\033[1m[%s]\033[0m %s\n' "$(date +%H:%M:%S)" "$*"; }
ok()   { printf '\033[32m✔\033[0m %s\n' "$*"; }
fail() { printf '\n\033[31m✖ %s\033[0m\n' "$*"; exit 1; }
trap 'fail "دیپلوی در خط $LINENO با خطا متوقف شد (لاگ: $LOG_FILE)"' ERR

# جلوگیری از اجرای هم‌زمان دو دیپلوی
exec 9> "$APP_DIR/.deploy.lock"
flock -n 9 || fail "یک دیپلوی دیگر همین حالا در حال اجراست"

log "شروع دیپلوی در $APP_DIR"

# ------------------------- ۱) گرفتن کد جدید --------------------------------
if [ "$SKIP_PULL" = "1" ]; then
  log "SKIP_PULL=1 → دریافت کد نادیده گرفته شد"
else
  # اختلاف فایل‌های تولیدشده Prisma روی سرور (خط‌پایان/نسخه) نباید جلوی pull را بگیرد
  git restore --worktree -- app/generated/prisma 2>/dev/null \
    || git checkout -- app/generated/prisma 2>/dev/null || true

  log "دریافت کد: $REMOTE/$BRANCH"
  git fetch "$REMOTE" "$BRANCH" || fail "git fetch ناموفق بود"
  git merge --ff-only "$REMOTE/$BRANCH" \
    || fail "دریافت کد ممکن نشد (تغییرات محلی روی سرور یا تاریخچه واگرا). ابتدا وضعیت گیت را بررسی کنید."
  ok "کد به روز شد: $(git rev-parse --short HEAD) — $(git log -1 --pretty=%s)"
fi

# -------------------------- ۲) نصب پکیج‌ها ---------------------------------
log "نصب پکیج‌ها (npm ci)"
if [ -f package-lock.json ]; then
  npm ci --include=dev --no-audit --no-fund || fail "npm ci ناموفق بود"
else
  npm install --include=dev --no-audit --no-fund || fail "npm install ناموفق بود"
fi
ok "پکیج‌ها نصب شدند"

# --------------------- ۳) بکاپ دیتابیس قبل از مایگریشن ---------------------
# آدرس اتصال را با Node می‌خوانیم و نرمال می‌کنیم. اگر رمز دیتابیس کاراکتر
# خاصی مثل @ داشته باشد، libpq آن را اشتباه تفسیر می‌کند و خطای
# «could not translate host name ...» می‌دهد؛ percent-encode کردن رمز حلش می‌کند.
mask_url() { printf '%s' "$1" | sed -E 's#(://[^:/@]*):[^@]*@#\1:***@#'; }

PG_DUMP_URL="$(
  node -e '
    const fs = require("fs");
    let raw = process.env.DATABASE_URL || "";
    if (!raw) {
      const txt = fs.existsSync(".env") ? fs.readFileSync(".env", "utf8") : "";
      const m = txt.match(/^[ \t]*DATABASE_URL[ \t]*=[ \t]*(.*)$/m);
      raw = m ? m[1].trim() : "";
      if ((raw.startsWith("\"") && raw.endsWith("\"")) || (raw.startsWith("\x27") && raw.endsWith("\x27"))) raw = raw.slice(1, -1);
    }
    if (!raw) { process.stderr.write("DATABASE_URL not found\n"); process.exit(2); }
    let u;
    try { u = new URL(raw); } catch (e) { process.stderr.write("invalid DATABASE_URL: " + e.message + "\n"); process.exit(3); }
    const dec = function (s) { try { return decodeURIComponent(s); } catch (e) { return s; } };
    u.username = encodeURIComponent(dec(u.username));
    u.password = encodeURIComponent(dec(u.password));
    const ssl = u.searchParams.get("sslmode");
    u.search = "";
    if (ssl) u.searchParams.set("sslmode", ssl);
    process.stdout.write(u.toString());
  '
)" || fail "DATABASE_URL پیدا نشد یا نامعتبر است (فایل .env سرور را بررسی کنید)"

BACKUP_FILE=""
if [ "$SKIP_BACKUP" = "1" ]; then
  log "SKIP_BACKUP=1 → بکاپ دیتابیس نادیده گرفته شد (توصیه نمی‌شود)"
else
  command -v pg_dump >/dev/null 2>&1 || fail "pg_dump نصب نیست. نصب کنید: apt-get install -y postgresql-client (یا SKIP_BACKUP=1 بدهید)"
  BACKUP_FILE="$BACKUP_DIR/db-$(date +%Y%m%d-%H%M%S).dump"
  log "بکاپ دیتابیس → $BACKUP_FILE"
  if ! pg_dump "$PG_DUMP_URL" -Fc -f "$BACKUP_FILE"; then
    rm -f "$BACKUP_FILE"
    fail "بکاپ دیتابیس ناموفق بود → مایگریشن اجرا نشد (آدرس اتصال: $(mask_url "$PG_DUMP_URL"))"
  fi
  ls -1t "$BACKUP_DIR"/db-*.dump 2>/dev/null | tail -n +$((BACKUP_KEEP + 1)) | xargs -r rm -f
  ok "بکاپ گرفته شد ($(du -h "$BACKUP_FILE" | cut -f1))"
fi

# --------------------------- ۴) مایگریشن دیتابیس ----------------------------
log "وضعیت مایگریشن‌ها (فقط اطلاع‌رسانی)"
./node_modules/.bin/prisma migrate status || true

log "اعمال مایگریشن‌ها: prisma migrate deploy"
./node_modules/.bin/prisma migrate deploy \
  || fail "مایگریشن ناموفق بود. هیچ ری‌استارتی انجام نشد. بکاپ: ${BACKUP_FILE:-ندارد}"
ok "دیتابیس با مایگریشن‌ها هم‌گام است"

# --------------------------- ۵) تولید کلاینت Prisma -------------------------
log "تولید کلاینت Prisma"
./node_modules/.bin/prisma generate || fail "prisma generate ناموفق بود"
ok "کلاینت Prisma تولید شد"

# ------------------------------- ۶) بیلد -----------------------------------
log "بیلد پروژه (npm run build)"
if ! npm run build; then
  fail "بیلد شکست خورد → pm2 ری‌استارت نشد؛ نسخه قبلی همچنان بالا است"
fi
ok "بیلد موفق بود"

# ------------------------- ۷) ری‌استارت سرویس -------------------------------
log "ری‌استارت pm2 ($PM2_APP)"
pm2 restart "$PM2_APP" --update-env || fail "pm2 restart ناموفق بود"
pm2 save >/dev/null 2>&1 || true
ok "سرویس ری‌استارت شد"

# --------------------------- ۸) بررسی سلامت --------------------------------
if [ -n "$HEALTH_URL" ] && command -v curl >/dev/null 2>&1; then
  log "بررسی سلامت: $HEALTH_URL"
  healthy=0
  for _ in $(seq 1 "$HEALTH_RETRIES"); do
    if curl -fsS -o /dev/null --max-time 5 "$HEALTH_URL"; then healthy=1; break; fi
    sleep "$HEALTH_INTERVAL"
  done
  if [ "$healthy" = "1" ]; then
    ok "سرویس سالم است"
  else
    fail "سرویس بعد از ری‌استارت پاسخ نداد. لاگ‌ها: pm2 logs $PM2_APP"
  fi
elif [ -n "$HEALTH_URL" ]; then
  log "curl نصب نیست → بررسی سلامت رد شد"
else
  log "HEALTH_URL تنظیم نشده → بررسی سلامت رد شد (برای فعال‌سازی در .deploy.env مقدار بدهید)"
fi

# -------------------------------- خلاصه ------------------------------------
log "پایان دیپلوی"
printf '  کامیت      : %s\n' "$(git rev-parse --short HEAD)"
printf '  بکاپ دیتابیس: %s\n' "${BACKUP_FILE:-ندارد}"
printf '  لاگ        : %s\n' "$LOG_FILE"
ok "دیپلوی با موفقیت انجام شد"
