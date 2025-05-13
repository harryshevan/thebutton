#!/bin/bash
mkdir -p public
PORT=${PORT:-3000} docker compose --env-file .env up --build --detach --remove-orphans
