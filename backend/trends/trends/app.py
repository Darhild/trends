import logging
from logging.config import dictConfig
import os
import yaml
from flask import Flask

from trends.clients.google import start_get_trends
from trends.clients.prefs import cache
from trends.handlers.trends import trends


OUTER_DIR = os.path.dirname(os.path.dirname(__file__))


def setup_logging(path=os.path.join(OUTER_DIR, 'logging.yaml')):
    print(OUTER_DIR)
    try:
        with open(path, 'rt') as f:
            config = yaml.safe_load(f.read())
            logging.config.dictConfig(config)

    except FileNotFoundError as e:
        print(e)
        print('Error in logging configuration. Using default')
        logging.basicConfig(level=logging.INFO)


def create_app(db_url, is_start_get_trends=True):
    app = Flask(__name__)
    # app.db = create_engine(db_url) #do we need db at all here?
    setup_logging()
    logger = logging.getLogger("trends")
    logger.debug("logger was set up")
    app.register_blueprint(trends, url_prefix='/')
    cache.init_app(app)
    if is_start_get_trends:
        start_get_trends()
    return app


if __name__ == '__main__':
    # export DATABASE_URL=postgresql://me:hackme@0.0.0.0/trends
    # run db
    # docker run  --rm -e POSTGRES_DB=trends -e POSTGRES_USER=me -e POSTGRES_PASSWORD=hackme -p 5432:5432 postgres:10.7
    # print('DATABASE_URL', os.environ['DATABASE_URL'])

    app = create_app(None)  # os.environ['DATABASE_URL'])
    app.run(host='0.0.0.0', port=8080)