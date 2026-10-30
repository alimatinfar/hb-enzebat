# دیپلوی (Deploy)

این پروژه یک اسکریپت دیپلوی دارد که کل مراحل دستی را با ترتیب درست و با ایمنی انجام می‌دهد:

[`scripts/deploy.sh`](scripts/deploy.sh) — روی سرور اجرا می‌شود
[`scripts/deploy.ps1`](scripts/deploy.ps1) — از ویندوز، با یک دستور

## هر بار پابلیش: یک دستور

```powershell
.\scripts\deploy.ps1
```

همین. اسکریپت به سرور وصل می‌شود و این زنجیره را اجرا می‌کند:

1. `git` — تغییرات تولیدشده Prisma را کنار می‌گذارد، `fetch` و `merge --ff-only` روی `master`
2. `npm ci` — نصب دقیق پکیج‌ها
3. **بکاپ دیتابیس** با `pg_dump` قبل از هر تغییر (نگهداری ۱۰ بکاپ آخر)
4. `prisma migrate deploy` — فقط مایگریشن‌های اعمال‌نشده
5. `prisma generate`
6. `npm run build`
7. `pm2 restart`
8. بررسی سلامت سرویس (اگر `HEALTH_URL` تنظیم شده باشد)

اگر هر مرحله شکست بخورد، اسکریپت **همان‌جا متوقف می‌شود** و `pm2` ری‌استارت نمی‌شود؛ یعنی نسخه قبلی که در حال اجراست پایین نمی‌آید.

## راه‌اندازی اولیه (فقط یک‌بار)

### ۰) بار اول: اسکریپت را به سرور برسانید

اسکریپت باید یک‌بار روی سرور موجود باشد. روی سیستم خودتان:

```powershell
git add scripts DEPLOY.md package.json .gitignore
git commit -m "chore: add deploy automation"
git push origin master
```

روی سرور (فقط همین یک‌بار):

```bash
cd /var/www/hb-enzebat
git pull origin master
chmod +x scripts/deploy.sh
```

از این به بعد فقط `.\scripts\deploy.ps1` از ویندوز.

### ۱) کلید SSH (تا هر بار پسورد نپرسد)

روی ویندوز، در PowerShell:

```powershell
ssh-keygen -t ed25519 -C "deploy-hb"
# Enter بزنید (مسیر پیش‌فرض، پسورد خالی)
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh root@171.22.26.118 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"
```

بار آخر یک‌بار پسورد سرور را می‌خواهد. بعد از آن `ssh root@171.22.26.118` باید بدون پسورد وارد شود.

### ۲) فایل تنظیمات روی سرور

```bash
cd /var/www/hb-enzebat
cp scripts/.deploy.env.example .deploy.env
nano .deploy.env
```

مقدار `PM2_APP` را با خروجی `pm2 list` هم‌راست کنید (نام یا id پروسه) و `HEALTH_URL` را اگر پورت اپ مشخص است بگذارید.

### ۳) پیش‌نیاز سرور

```bash
apt-get install -y postgresql-client   # برای pg_dump
```

### ۴) دسترسی اجرا

```bash
chmod +x scripts/deploy.sh
```

## چرا دیتابیس امن است؟

نگرانی اصلی «خراب شدن دیتا بعد از migrate» است. این اسکریپت سه لایه محافظت دارد:

| لایه | توضیح |
| --- | --- |
| **فقط `migrate deploy`** | این دستور فقط فایل‌های SQL جدیدِ پوشه `prisma/migrations` را به ترتیب اجرا می‌کند. هرگز `reset` نمی‌کند، هرگز `db push` نمی‌زند و هرگز جدول/داده‌ای را بدون دستور صریح در فایل مایگریشن حذف نمی‌کند. |
| **بکاپ قبل از هر دیپلوی** | `pg_dump -Fc` از کل دیتابیس، قبل از اجرای مایگریشن. اگر مایگریشن خطا بدهد، فایل بکاپ همان‌جاست. |
| **توقف قبل از ری‌استارت** | اگر مایگریشن یا بیلد شکست بخورد، دیپلوی متوقف می‌شود و سرویس فعلی دست نمی‌خورد. |

درباره مایگریشن‌های این پروژه: همه «افزایشی» (additive) هستند — `ADD COLUMN`، `CREATE TABLE`، `CREATE INDEX`. هیچ‌کدام `DROP` یا تغییر نوع مخرب ندارند. مایگریشن اخیر هم فقط این است:

```sql
ALTER TABLE "Class" ADD COLUMN "isVirtual" BOOLEAN NOT NULL DEFAULT false;
```

یعنی فقط یک ستون اضافه می‌شود؛ ردیف‌های قبلی خودکار `false` می‌شوند و هیچ داده‌ای لمس نمی‌شود.

### چیزهایی که هرگز روی سرور اجرا نکنید

```bash
npx prisma migrate dev      # ❌ می‌تواند پیشنهاد reset بدهد / shadow database می‌سازد
npx prisma migrate reset    # ❌ کل دیتابیس را پاک می‌کند
npx prisma db push          # ❌ تاریخچه مایگریشن را دور می‌زند و ممکن است داده را از دست بدهد
```

فقط و فقط `prisma migrate deploy` (که اسکریپت خودش انجام می‌دهد).

## بکاپ و بازگردانی

بکاپ‌ها: `/var/www/hb-enzebat/backups/db-YYYYmmdd-HHMMSS.dump`

بازگردانی:

```bash
pg_restore -d "$DATABASE_URL" --clean --if-exists /var/www/hb-enzebat/backups/db-....dump
# یا اگر DATABASE_URL در .env است:
set -a; . ./.env; set +a
pg_restore -d "$DATABASE_URL" --clean --if-exists backups/db-....dump
```

بکاپ دستی خارج از سرور (توصیه ماهی یک‌بار):

```bash
ssh root@171.22.26.118 "pg_dump '$DATABASE_URL' -Fc" > hb-enzebat-$(date +%F).dump
```

## گزینه‌های اسکریپت

| متغیر | پیش‌فرض | کار |
| --- | --- | --- |
| `BRANCH` | `master` | شاخه دیپلوی |
| `PM2_APP` | `1` | نام/id پروسه pm2 |
| `HEALTH_URL` | خالی | آدرس بررسی سلامت بعد از ری‌استارت |
| `BACKUP_KEEP` | `10` | تعداد بکاپ نگه‌داشته‌شده |
| `SKIP_PULL` | `0` | با `1` کد pull نمی‌شود |
| `SKIP_BACKUP` | `0` | با `1` بکاپ گرفته نمی‌شود (توصیه نمی‌شود) |

مثال:

```powershell
.\scripts\deploy.ps1 -SkipPull          # فقط بیلد و ری‌استارت، بدون pull
```

## لاگ‌ها

هر اجرا یک فایل در `/var/www/hb-enzebat/logs/deploy-*.log` می‌سازد و همان خروجی را در ترمینال نشان می‌دهد.

## عیب‌یابی

| مشکل | راه‌حل |
| --- | --- |
| `pg_dump: could not translate host name "..."` | رمز دیتابیس کاراکتر خاص (مثل `@`) دارد. اسکریپت آدرس را خودش نرمال می‌کند (نسخه جدید را pull کنید). اگر باز هم تکرار شد، ساختار آدرس را با این دستور ببینید و برایم بفرستید: `grep '^DATABASE_URL' .env \| sed -E 's#(://[^:/@]*):[^@]*@#\1:***@#'` |
| `git merge` شکست خورد | روی سرور تغییرات محلی مانده است: `git status` ببینید؛ اگر همه تولیدشده Prisma است، `git restore --worktree app/generated/prisma` و دوباره اجرا کنید. |
| `pg_dump: server version mismatch` | نسخه client باید با سرور هم‌خوان باشد: `apt-get install -y postgresql-client-<نسخه>` |
| `pg_dump` نصب نیست | `apt-get install -y postgresql-client` |
| بررسی سلامت شکست خورد | `HEALTH_URL` را در `.deploy.env` درست کنید یا خالی بگذارید؛ بعد `pm2 logs $PM2_APP` را ببینید. |
| مایگریشن شکست خورد | دیپلوی متوقف شده و سرویس قبلی بالاست. خطا را بخوانید، بکاپ را برگردانید: `pg_restore -d "$DATABASE_URL" --clean --if-exists backups/db-....dump` |
| می‌خواهم فقط بیلد کنم | `.\scripts\deploy.ps1 -SkipPull` یا `SKIP_PULL=1 bash scripts/deploy.sh` |

> اگر رمز دیتابیس شامل `@`، `:`، `/`، `#` یا `?` است، بهتر است در `.env` آن را percent-encode کنید (مثلاً `@` → `%40`). اسکریپت خودش آدرس را نرمال می‌کند، اما اصلاح `.env` همه ابزارهای دیگر (psql، pg_restore، pgAdmin) را هم سالم می‌کند.

> ⚠️ اگر دیپلوی در مرحله بکاپ متوقف شد، **دستی `pm2 restart` نزنید**: کد جدید (که ستون `isVirtual` را می‌خواهد) قبل از مایگریشن بالا می‌آید و خطا می‌دهد. فقط دوباره `deploy.ps1` را اجرا کنید تا اول مایگریشن انجام شود.

## نکته امنیتی مهم

رمز root قبلاً به‌صورت متن ساده در چت فرستاده شده است. توصیه:

1. بعد از اینکه کلید SSH کار کرد، ورود با پسورد را برای root ببندید:
   `sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config && systemctl reload ssh`
2. پسورد root را عوض کنید: `passwd root`
3. در اسکریپت‌ها هرگز پسورد نگذارید — همه‌چیز از طریق کلید SSH است.
