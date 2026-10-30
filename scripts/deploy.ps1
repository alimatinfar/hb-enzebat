#Requires -Version 5.1
<#
.SYNOPSIS
    Deploy hb-enzebat to the server with a single command.

.DESCRIPTION
    Connects over SSH and runs scripts/deploy.sh on the server:
    git pull -> npm ci -> DB backup -> prisma migrate deploy -> generate -> build -> pm2 restart.

    Before running the server script, the repo is fast-forwarded so the server always
    uses the latest deploy script (bootstrap: first run on a fresh server).

    Password-less login: install your SSH key on the server once (see DEPLOY.md).

.EXAMPLE
    .\scripts\deploy.ps1

.EXAMPLE
    .\scripts\deploy.ps1 -Server root@1.2.3.4 -AppDir /var/www/hb-enzebat

.EXAMPLE
    .\scripts\deploy.ps1 -SkipPull      # no pull, just build + restart
#>
param(
    [string]$Server = 'root@171.22.26.118',
    [string]$AppDir = '/var/www/hb-enzebat',
    [switch]$SkipPull
)

$ErrorActionPreference = 'Stop'

if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
    throw 'ssh not found. Enable OpenSSH Client in Windows Optional Features.'
}

$remoteScript = if ($SkipPull) {
    'SKIP_PULL=1 bash scripts/deploy.sh'
} else {
    'git restore --worktree app/generated/prisma 2>/dev/null || true; git pull --ff-only origin master && bash scripts/deploy.sh'
}
$remoteCommand = "cd $AppDir && $remoteScript"

Write-Host "Deploying to $Server ($AppDir) ..." -ForegroundColor Cyan

ssh -o ConnectTimeout=20 -o ServerAliveInterval=30 $Server $remoteCommand
$exitCode = $LASTEXITCODE

if ($exitCode -ne 0) {
    Write-Host "Deploy FAILED (exit $exitCode). Server log: $AppDir/logs/" -ForegroundColor Red
    exit $exitCode
}

Write-Host "Deploy OK." -ForegroundColor Green
