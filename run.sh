#!/bin/sh

npx jest
if [ $? -eq 0 ]; then
  node server.js
else
  echo "Tests failed, not starting server..."
  exit 1
fi
