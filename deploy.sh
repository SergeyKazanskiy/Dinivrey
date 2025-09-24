# Поддерживает dev и prod
# Для prod берёт конкретную версию с Docker Hub
# Запускает новый контейнер
# Удаляет старые локальные образы на VPS, оставляя только текущую версию ???
# Dev собирается локально через docker-compose, без очистки образов ???

# в prod не надо вручную удалять образы, docker compose pull сам скачает актуальную версию;
# используется docker compose ... (новый синтаксис).

#!/bin/bash
set -e

ENV=$1
VERSION=$2  # например: 1.0.1, обязательно для prod

if [[ -z "$ENV" ]]; then
  echo "Usage: ./deploy.sh [dev|prod] [version]"
  exit 1
fi

echo "Deploying $ENV environment..."

# ------------------- Dev -------------------
if [[ "$ENV" == "dev" ]]; then
    git checkout Developer
    git pull origin Developer
    docker compose -f docker-compose.dev.yml up -d --build
    echo "Dev deployment completed."
    exit 0
fi

# ------------------- Prod -------------------
if [[ "$ENV" == "prod" ]]; then
    if [[ -z "$VERSION" ]]; then
        echo "ERROR: VERSION is required for prod deployment."
        exit 1
    fi

    echo "Deploying prod version $VERSION..."

    # Пробрасываем версию в docker-compose.prod.yml
    export VERSION=$VERSION

    docker compose -f docker-compose.prod.yml down
    docker compose -f docker-compose.prod.yml pull
    docker compose -f docker-compose.prod.yml up -d

    echo "Prod deployment of version $VERSION completed."
    exit 0
fi

echo "Unknown environment: $ENV"
exit 1