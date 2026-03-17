# MOS Dashboard - Local Testing Script
# Run this in PowerShell to verify your setup

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  MOS Dashboard - Local Test Script  " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node -v 2>$null
if ($?) {
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
    if ($nodeVersion -lt "v18") {
        Write-Host "⚠️  Warning: Node.js 18+ recommended" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Node.js not found! Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host ""
Write-Host "Checking npm..." -ForegroundColor Yellow
$npmVersion = npm -v 2>$null
if ($?) {
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found!" -ForegroundColor Red
    exit 1
}

# Check if in correct directory
Write-Host ""
Write-Host "Checking project location..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "✅ package.json found" -ForegroundColor Green
} else {
    Write-Host "❌ package.json not found!" -ForegroundColor Red
    Write-Host "   Please run this script from the mos-dashboard folder" -ForegroundColor Red
    exit 1
}

# Check node_modules
Write-Host ""
Write-Host "Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules found" -ForegroundColor Green
} else {
    Write-Host "⚠️  node_modules not found. Running npm install..." -ForegroundColor Yellow
    npm install
    if ($?) {
        Write-Host "✅ Dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

# Check key files
Write-Host ""
Write-Host "Checking project files..." -ForegroundColor Yellow
$requiredFiles = @(
    "astro.config.mjs",
    "tailwind.config.mjs",
    "src/layouts/Layout.astro",
    "src/pages/index.astro"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file missing!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host ""
    Write-Host "Some required files are missing!" -ForegroundColor Red
    exit 1
}

# Try to build
Write-Host ""
Write-Host "Testing build..." -ForegroundColor Yellow
Write-Host "Running: npm run build" -ForegroundColor Gray
npm run build 2>&1 | Tee-Object -FilePath build.log | ForEach-Object {
    if ($_ -match "error|Error|ERROR") {
        Write-Host $_ -ForegroundColor Red
    } elseif ($_ -match "warn|Warn|WARN") {
        Write-Host $_ -ForegroundColor Yellow
    } else {
        Write-Host $_
    }
}

if ($?) {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Green
    Write-Host "  ✅ BUILD SUCCESSFUL!" -ForegroundColor Green
    Write-Host "======================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: npm run preview" -ForegroundColor White
    Write-Host "2. Open: http://localhost:4321" -ForegroundColor White
    Write-Host "3. Test all pages and features" -ForegroundColor White
    Write-Host ""
    Write-Host "To deploy to Vercel:" -ForegroundColor Cyan
    Write-Host "  npm i -g vercel" -ForegroundColor White
    Write-Host "  vercel" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Red
    Write-Host "  ❌ BUILD FAILED" -ForegroundColor Red
    Write-Host "======================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check build.log for details" -ForegroundColor Yellow
    Write-Host "Common fixes:" -ForegroundColor Cyan
    Write-Host "1. Delete node_modules and run npm install again" -ForegroundColor White
    Write-Host "2. Delete .astro folder" -ForegroundColor White
    Write-Host "3. Check Node.js version (should be 18+)" -ForegroundColor White
}
