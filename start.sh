#!/bin/bash
# Запускаем supervisor (nginx + uvicorn)
supervisord -c /etc/supervisor/conf.d/supervisord.conf
tail -f /var/log/supervisor/*.log
