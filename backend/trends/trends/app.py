import logging
from logging.config import dictConfig
import os
import yaml
from flask import Flask

from trends.clients.google import start_get_trends
from trends.clients.prefs import cache
from trends.handlers.trends import trends

CURRENT_DIR = os.path.dirname(__file__)


def setup_logging(path=os.path.join(CURRENT_DIR, 'logging.yaml')):
    """
    Set logging config
    :param path: path of yaml-file with logging setting
    """
    try:
        with open(path, 'rt') as f:
            config = yaml.safe_load(f.read())
            dictConfig(config)

    except FileNotFoundError as e:
        logging.warning(e)
        logging.warning('Error in logging configuration. Using default')
        logging.basicConfig(level=logging.INFO)


def create_app(is_start_get_trends=True):
    """
    Starts flask service
    :param is_start_get_trends: do start get trend from google trend if True
    :return: flask app
    """
    setup_logging()
    logger = logging.getLogger("trends")
    logger.debug("About to create service trends")
    try:
        app = Flask(__name__)
        logger.info("Service trends was successfully created")
    except Exception as e:
        logger.critical("Can't create service due to %s:", e)
        raise
    app.register_blueprint(trends, url_prefix='/')

    try:
        cache.init_app(app)
        logger.info("Cache was initialized")
    except Exception as e:
        logger.error("Can't initialise cache due to %s:", e)
        raise

    if is_start_get_trends:
        start_get_trends()
    return app


if __name__ == '__main__':
    app = create_app()  # os.environ['DATABASE_URL'])
    app.run(host='0.0.0.0', port=8080)
