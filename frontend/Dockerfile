# 1. Сначала используем Node.js для сборки фронтенда
FROM node:18 AS build

# 2. Рабочая директория
WORKDIR /app

# 3. Копируем package.json и package-lock.json (чтобы кешировались зависимости)
COPY frontend/package*.json ./

# 4. Устанавливаем зависимости (production, чтобы не тянуть devDependencies)
RUN npm ci --omit=dev

# 5. Копируем весь проект
COPY frontend/ ./

# 6. Собираем production-версию React
RUN npm run build

# 7. Теперь создаём финальный контейнер с Nginx
FROM nginx:alpine

# 8. Копируем собранный билд React в папку, откуда Nginx будет отдавать статику
COPY --from=build /app/build /usr/share/nginx/html

# 9. Настраиваем Nginx конфиг (будет проксировать API на бэкенд)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 10. Указываем порт
EXPOSE 80

# 11. Запускаем сервер
CMD ["nginx", "-g", "daemon off;"]
