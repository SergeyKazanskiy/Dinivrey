# 1. Берём официальный Python-образ
FROM python:3.11-slim

# 2. Отключаем .pyc, __pycache__ и буферизацию логов
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Создаём пользователя (делаем сразу, чтобы был доступ при настройке папки)
RUN useradd -m appuser || true

# 4. Создаём рабочую директорию и назначаем права пользователю
RUN mkdir -p /app && chown -R appuser:appuser /app
WORKDIR /app

# 5. Копируем файл зависимостей
COPY backend/requirements.txt .

# 6. Устанавливаем зависимости (FastAPI, Uvicorn и т.д.)
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# 7. Копируем весь код бэкенда
COPY backend/ ./

# 8. Переключаемся на непривилегированного пользователя
USER appuser

# 9. Указываем порт
EXPOSE 8000

# 10. Запускаем сервер
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]



# Установим зависимости системы (если нужны)
#RUN apt-get update && apt-get install -y build-essential curl && rm -rf /var/lib/apt/lists/*