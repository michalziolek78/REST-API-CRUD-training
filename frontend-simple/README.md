
# Frontend (zero-dependency)

To jest prosty frontend do ćwiczeń CRUD na obu backendach (FastAPI lub json-server).

## Start
- Windows: kliknij `start-frontend.bat`
- macOS/Linux: `./start-frontend.sh`

Skrypt uruchomi lokalny serwer statyczny (Python http.server) na porcie **5173**.
Otwórz: `http://127.0.0.1:5173`

W górze strony jest pole **API Base URL**:
- `http://127.0.0.1:8000` → FastAPI
- `http://127.0.0.1:3001` → json-server

## Wymagania
- Python 3.10+ (dla prostego servera plików)
