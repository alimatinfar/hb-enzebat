#Requires -Version 5.1
<#
.SYNOPSIS
    دیپلوی hb-enzebat روی سرور با یک دستور.

.DESCRIPTION
    به سرور ssh می‌زند و همان‌جا scripts/deploy.sh را اجرا می‌کند:
    pull → npm ci → بکاپ دیتابیس → migrate deploy → generate → build → restart.
    برای اینکه هر بار رمز نپرسد، یک‌بار کلید SSH را روی سرور نصب کنید (DEPLOY.md).

.EXAMPLE
    .\scripts\deploy.ps1

.EXAMPLE
    .\scripts\deploy.ps1 -Server root@1.2.3.4 -AppDir /var/www/hb-enzebat

.EXAMPLE
    .\scripts\deploy.ps1 -SkipPull      # کد را pull نکن، فقط بیلد و ری‌استارت
#>
param(
    [string]$Server = 'root@171.22.26.118',
    [string]$AppDir = '/var/www/hb-enzebat',
    [switch]$SkipPull
)

$ErrorActionPreference = 'Stop'

if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
    throw 'ssh پیدا نشد. OpenSSH Client را در ویندوز فعال کنید (Settings → Optional Features).'
}

$remoteScript = if ($SkipPull) {
    "SKIP_PULL=1 bash scripts/deploy.sh"
} else {
    "bash scripts/deploy.sh"
}
$remoteCommand = "cd $AppDir && $remoteScript"

Write-Host "» دیپلوی روی $Server ($AppDir) ..." -ForegroundColor Cyan

ssh -o ConnectTimeout=20 -o ServerAliveInterval=30 $Server $remoteCommand
$exitCode = $LASTEXITCODE

if ($exitCode -ne 0) {
    Write-Host "✖ دیپلوی با خطا تمام شد (کد $exitCode). لاگ کامل روی سرور: $AppDir/logs/" -ForegroundColor Red
    exit $exitCode
}

Write-Host "✔ دیپلوی با موفقیت انجام شد." -ForegroundColor Green
