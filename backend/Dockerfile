# Базовый образ с Python
FROM python:3.11-slim

# Рабочая директория внутри контейнера
WORKDIR /app

# Сначала копируем файл зависимостей (чтобы не пересобирать при каждом изменении кода)
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем исходники приложения
# Здесь структура backend/app/main.py → попадёт в /app/backend/app/main.py
COPY ./app /app/backend/app

# Копируем файл окружения (.env)
# Внимание: это удобно для разработки, но небезопасно для продакшена,
# лучше использовать docker-compose или secrets
COPY .env /app/backend/.env

# Копируем скрипты запуска и конфиг supervisor
COPY uvicorn_start.sh /uvicorn_start.sh
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Делаем скрипт запуска исполняемым
RUN chmod +x /uvicorn_start.sh

# Запускаем uvicorn
CMD ["/uvicorn_start.sh"]
