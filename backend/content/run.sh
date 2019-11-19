#!/bin/sh
set -e
docker pull antoninagerasiova/trenders_efir:latest
docker rm -f content || true
docker run -p8081:8080 -d --rm --name content antoninagerasiova/trenders_efir:latest

