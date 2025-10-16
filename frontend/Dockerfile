FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json ./

# Используем ci для надёжной установки зависимостей
RUN npm ci --silent

COPY . .

# Собираем проект с полной отладкой
RUN npm run build --verbose || (echo "Build failed"; exit 1)

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
