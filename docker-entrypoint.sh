#!/bin/sh
set -ex
cd /app && yarn install
exec "$@"
