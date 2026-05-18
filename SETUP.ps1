# Make it Oman - PowerShell Setup Script

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Make it Oman Platform Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is installed
Write-Host "[*] Checking Docker installation..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    Write-Host "[OK] Docker is installed" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Docker is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop" -ForegroundColor Red
    exit 1
}

# Check if Docker Compose is installed
Write-Host "[*] Checking Docker Compose installation..." -ForegroundColor Yellow
try {
    docker-compose --version | Out-Null
    Write-Host "[OK] Docker Compose is installed" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Docker Compose is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Starting Make it Oman Services" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will start:" -ForegroundColor Yellow
Write-Host "  - PostgreSQL Database (port 5432)" -ForegroundColor Yellow
Write-Host "  - Redis Cache (port 6379)" -ForegroundColor Yellow
Write-Host "  - Node.js Backend API (port 5000)" -ForegroundColor Yellow
Write-Host "  - React Frontend (port 3000)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Enter to continue or Ctrl+C to cancel" -ForegroundColor Yellow
Read-Host

# Start Docker Compose
Write-Host ""
Write-Host "Starting services..." -ForegroundColor Cyan
docker-compose up

Write-Host ""
Write-Host "Services stopped." -ForegroundColor Yellow
