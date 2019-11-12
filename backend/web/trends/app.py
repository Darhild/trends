from flask import Flask
from trends.db import create_engine
from trends.handlers.trends import trends
import os

from trends.collectors.efir import EfirCollector
from trends.collectors.google import GoogleCollector
from trends.models.trends_repo import Repository
from trends.utils.get_db_environ import get_environ_or_default


# my_ip = "84.201.160.40"
my_ip = "127.0.0.1"


def create_app(db_url):
    app = Flask(__name__)
    app.db = create_engine(db_url)
    app.register_blueprint(trends, url_prefix='/')
    return app


if __name__ == '__main__':
    # export DATABASE_URL=postgresql://me:hackme@0.0.0.0/trends
    db_url = get_environ_or_default('DATABASE_URL', 'postgresql://me:hackme@0.0.0.0/trends')
    print('DATABASE_URL', db_url)

    app = create_app(db_url)

    repo = Repository(app.db)
    collectors = [
        EfirCollector(
            repo,
            get_environ_or_default('EFIR_URL', "http://{0}:8081/fetch".format(my_ip))
        ),
        GoogleCollector(
            repo,
            get_environ_or_default('GOOGLE_URL', "http://{0}:8082/fetch".format(my_ip))
        )
    ]
    for c in collectors:
        c.start()

    app.run(host='0.0.0.0', port=8080)
