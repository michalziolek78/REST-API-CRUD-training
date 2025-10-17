@echo off
where python >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo Nie znaleziono Python. Zainstaluj Python 3.10+.
  pause
  exit /b 1
)
echo Uruchamiam prosty serwer http na porcie 5173...
python -m http.server 5173
pause