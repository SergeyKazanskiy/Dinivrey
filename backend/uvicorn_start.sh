#!/bin/bash
# Запуск backend

cd /app/backend/app
exec uvicorn main:app --host 0.0.0.0 --port 8000
# exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
