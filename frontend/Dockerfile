# стадия сборки React
FROM node:18 as build

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# стадия запуска через nginx
FROM nginx:alpine

# копируем билд React
COPY --from=build /app/build /usr/share/nginx/html

# копируем наш конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
