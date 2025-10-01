# ---------- Stage 1: build frontend ----------
FROM node:20 AS frontend-builder

WORKDIR /app/frontend

# Копируем package.json и установим зависимости
COPY frontend/package*.json ./

# Копируем все .env файлы
COPY frontend/.env ./            # локальная сборка
COPY frontend/.env.production ./ # продакшен

RUN npm install

COPY frontend/ ./

# По умолчанию сборка использует .env (локально / Playground)
ARG NODE_ENV=development
RUN if [ "$NODE_ENV" = "production" ]; then npm run build -- --mode production; else npm run build; fi

# ---------- Stage 2: backend ----------
FROM python:3.11-slim AS backend

WORKDIR /app/backend

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./

# ---------- Stage 3: final image ----------
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx supervisor && \
    rm -rf /var/lib/apt/lists/*

# Копируем фронтенд билд
COPY --from=frontend-builder /app/frontend/build /var/www/html

# Копируем backend
COPY --from=backend /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=backend /app/backend ./backend

# Копируем конфиги и скрипты
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY start.sh /start.sh
COPY uvicorn_start.sh /uvicorn_start.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod +x /start.sh /uvicorn_start.sh

EXPOSE 80

CMD ["/start.sh"]
