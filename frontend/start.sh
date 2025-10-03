#!/bin/sh
if [ ! -d "node_modules" ]; then
  echo "node_modules не найден, выполняю npm install..."
  npm install
fi
npm start


