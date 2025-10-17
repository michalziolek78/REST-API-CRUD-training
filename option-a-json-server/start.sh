#!/usr/bin/env bash
# Szybki start json-server na macOS/Linux
if ! command -v npm >/dev/null 2>&1; then
  echo "Nie znaleziono npm. Zainstaluj Node.js (https://nodejs.org)."
  exit 1
fi
if [ ! -d "node_modules" ]; then
  echo "Instaluję zależności..."
  npm i
fi
echo "Uruchamiam json-server..."
npm run start