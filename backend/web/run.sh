#!/bin/sh
set -e
docker rm -f web || true
docker pull antoninagerasiova/trenders_mixer:latest
docker run --network host -e DATABASE_URL=postgresql://me:hackme@127.0.0.1/trends -d --rm --name web antoninagerasiova/trenders_mixer:latest

