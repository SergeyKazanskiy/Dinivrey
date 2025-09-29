#!/usr/bin/env bash
set -e

echo "Запуск FastAPI через uvicorn..."
cd /app/backend
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
