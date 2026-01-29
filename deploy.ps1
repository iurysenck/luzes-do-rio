# Deployment Script
# Run this in PowerShell: .\deploy.ps1

Write-Host "=== Luzes do Rio Deployment ===" -ForegroundColor Cyan

# 1. GitHub Setup
$ghPath = "C:\Program Files\GitHub CLI\gh.exe"
if (-not (Test-Path $ghPath)) {
    $ghPath = "gh" # Try global path
}

Write-Host "`n1. Checking GitHub Authentication..." -ForegroundColor Yellow
& $ghPath auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please log in to GitHub:" -ForegroundColor White
    & $ghPath auth login
}

Write-Host "`nCreating repository 'luzes-do-rio'..." -ForegroundColor Yellow
# Check if repo exists remotely or create it
& $ghPath repo create luzes-do-rio --public --source="." --remote="origin" --push

if ($LASTEXITCODE -ne 0) {
    Write-Host "Repo might already exist or git connection issue. Trying to push anyway..." -ForegroundColor DarkGray
    git push -u origin main
}

# 2. Vercel Setup
Write-Host "`n2. Vercel Deployment..." -ForegroundColor Yellow
Write-Host "You may need to log in to Vercel..." -ForegroundColor White
vercel login

Write-Host "`nDeploying to Production..." -ForegroundColor Yellow
vercel --prod

Write-Host "`n=== Deployment Complete! ===" -ForegroundColor Green
