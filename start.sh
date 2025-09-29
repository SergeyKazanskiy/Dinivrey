#!/usr/bin/env bash
set -e

echo "Запуск supervisord..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
