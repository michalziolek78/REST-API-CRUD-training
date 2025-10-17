@echo off
REM Szybki start json-server na Windows
where npm >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo Nie znaleziono npm. Zainstaluj Node.js (https://nodejs.org).
  pause
  exit /b 1
)
IF NOT EXIST node_modules (
  echo Instaluję zależności...
  npm i
)
echo Uruchamiam json-server...
npm run start
pause