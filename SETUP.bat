@echo off
REM Make it Oman - Quick Setup Script
REM This script helps set up the development environment

echo.
echo ============================================
echo   Make it Oman Platform Setup
echo ============================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed or not in PATH
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo [OK] Docker found: %ERRORLEVEL%
echo.

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose is not installed
    echo It should come with Docker Desktop
    pause
    exit /b 1
)

echo [OK] Docker Compose found

echo.
echo ============================================
echo   Starting Make it Oman Services
echo ============================================
echo.
echo This will start:
echo   - PostgreSQL Database
echo   - Redis Cache
echo   - Node.js Backend API
echo   - React Frontend
echo.
echo Press Enter to continue or Ctrl+C to cancel
pause

REM Start Docker Compose
docker-compose up

pause
