
# Opcja A: json-server (najszybszy start)

Wymagania: Node.js (zalecane LTS).

## Start
1) Otwórz folder `option-a-json-server` w terminalu.
2) Zainstaluj zależności: `npm i`
3) Uruchom: `npm run start`
4) Serwer działa na: `http://127.0.0.1:3001`

### Przykładowe endpointy
- GET `http://127.0.0.1:3001/api/v1/users`
- POST `http://127.0.0.1:3001/api/v1/users` (body JSON np. `{ "name": "Nowy", "email": "nowy@example.com", "role": "user" }`)
- PATCH `http://127.0.0.1:3001/api/v1/users/1`
- DELETE `http://127.0.0.1:3001/api/v1/users/1`

Zmiany będą zapisywane do pliku `db.json` (fizyczna zmiana).

### Skróty
- Jeśli chcesz „klikane” uruchamianie na Windows: utwórz skrót do `npm run start` lub użyj pliku `start.bat`.
