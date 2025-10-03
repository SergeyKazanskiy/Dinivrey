#!/bin/sh
if [ ! -d "node_modules" ]; then
  echo "node_modules не найден, выполняю npm install..."
  npm install
fi
npm start


# #!/bin/bash
# # Запускаем supervisor (nginx + uvicorn)
# supervisord -c /etc/supervisor/conf.d/supervisord.conf
# tail -f /var/log/supervisor/*.log
