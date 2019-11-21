#!/usr/bin/env python3

import requests
import logging
from pymongo import MongoClient
import json
from datetime import datetime
import os

logs_dir = "/tmp"

logging.basicConfig(
    filename=os.path.join(logs_dir, "{}.log".format(datetime.now().isoformat(timespec='hours'))),
    level=logging.DEBUG,
    format='[%(asctime)s] %(process)d %(levelname)s %(module)s: %(message)s',
)

trends_url = 'http://84.201.160.40:8080/api/trends'
client = MongoClient('mongodb://localhost:27017/')
db = client.trends


def write():
    logging.info("> waking up")

    trends_col = db['trends_data']

    r = requests.get(trends_url)
    if r.status_code != 200 and r.status_code != 201:
        logging.error("failed to fetch from url: {0}, code: {1}".format(trends_url, r.status_code))
        exit(1)

    # for c in json.loads(r.content):
    #    res = trends_col.insert_one(c)
    data = json.loads(r.content)
    res = trends_col.insert_one({"date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "data": data})
    logging.info("collected result: {0}, len: {1}".format(res.inserted_id, len(data)))

    logging.info("> going to sleep")
    logging.info("")


def read():
    pass


if __name__ == '__main__':
    write()
