#!/usr/bin/env bash
set -e
if ! command -v python3 >/dev/null 2>&1; then
  echo "Nie znaleziono Python 3.10+. Zainstaluj Python."
  exit 1
fi
echo "Uruchamiam prosty serwer http na porcie 5173..."
python3 -m http.server 5173