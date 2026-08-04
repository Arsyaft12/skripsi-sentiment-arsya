<#
deploy_full.ps1
Skrip otomatis untuk:
- Menambahkan GitHub Actions secrets (RENDER_API_KEY, RENDER_SERVICE_ID, VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- Commit & push perubahan (jika ada)
- Trigger GitHub Actions workflows yang dibuat
- Tampilkan status run singkat

PENTING: Jalankan skrip ini di root repository lokal Anda (folder yang berisi .git). Jangan transfer token/secret melalui chat.
#>

function Read-Secret([string]$prompt) {
    $secure = Read-Host -AsSecureString -Prompt $prompt
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try { [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr) }
    finally { if ($bstr) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) } }
}

Write-Host "--- Deploy helper: menambahkan secrets & trigger CI/CD ---" -ForegroundColor Cyan

# Pastikan gh terpasang
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI 'gh' tidak ditemukan. Instal terlebih dahulu: https://cli.github.com/"
    exit 1
}

# Pastikan berada di repo git
if (-not (Test-Path .git)) {
    Write-Error "Tidak menemukan folder .git. Jalankan skrip ini dari root repository lokal Anda."
    exit 1
}

# Baca secrets dari user
$renderApiKey = Read-Secret "Masukkan RENDER_API_KEY (input tersembunyi)"
$renderServiceId = Read-Host "Masukkan RENDER_SERVICE_ID (paste)"
$vercelToken = Read-Secret "Masukkan VERCEL_TOKEN (input tersembunyi)"
$vercelOrgId = Read-Host "Masukkan VERCEL_ORG_ID (paste)"
$vercelProjectId = Read-Host "Masukkan VERCEL_PROJECT_ID (paste)"

Write-Host "Menambahkan secrets ke GitHub Actions..." -ForegroundColor Yellow
try {
    gh secret set RENDER_API_KEY --body "$renderApiKey"
    gh secret set RENDER_SERVICE_ID --body "$renderServiceId"
    gh secret set VERCEL_TOKEN --body "$vercelToken"
    gh secret set VERCEL_ORG_ID --body "$vercelOrgId"
    gh secret set VERCEL_PROJECT_ID --body "$vercelProjectId"
    Write-Host "✓ Secrets berhasil ditambahkan." -ForegroundColor Green
} catch {
    Write-Error "Gagal menambahkan secrets: $_"
    exit 1
}

# Commit & push (jika ada perubahan staged)
Write-Host "Memeriksa perubahan git..." -ForegroundColor Yellow
$diff = git status --porcelain
if ($diff) {
    Write-Host "Perubahan lokal terdeteksi. Menambahkan dan push ke origin/main..." -ForegroundColor Yellow
    git add .
    git commit -m "ci: add deploy workflows and render config (automated)"
    git push origin main
    Write-Host "✓ Push selesai." -ForegroundColor Green
} else {
    Write-Host "Tidak ada perubahan lokal untuk di-push." -ForegroundColor Cyan
}

# Trigger workflows
Write-Host "Memicu workflows di GitHub Actions..." -ForegroundColor Yellow
try {
    gh workflow run deploy-backend-render.yml
    gh workflow run deploy-frontend-vercel.yml
    Write-Host "✓ Workflows dipicu. Tunggu beberapa menit untuk proses deploy." -ForegroundColor Green
} catch {
    Write-Error "Gagal memicu workflow: $_"
}

# Tampilkan run list singkat
Start-Sleep -Seconds 5
Write-Host "Menampilkan 5 run Actions terbaru..." -ForegroundColor Cyan
gh run list --limit 5

Write-Host "
Selesai. Setelah workflows selesai, berikan URL publik backend & frontend di sini supaya saya bisa memverifikasi endpoint dan akses publik." -ForegroundColor Magenta

# Opsional: panduan set NEXT_PUBLIC_API_URL di Vercel
Write-Host "
Jika Anda ingin set environment variable NEXT_PUBLIC_API_URL secara otomatis menggunakan Vercel CLI, jalankan:"
Write-Host "vercel login" -ForegroundColor White
Write-Host "vercel env add NEXT_PUBLIC_API_URL production" -ForegroundColor White

exit 0
