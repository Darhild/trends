import logging
import os
from logging.config import dictConfig

import yaml
from flask import Flask

from comment_trends.handlers.comment_trends import comment_trends
from comment_trends.trends_logic.trends import cache
from comment_trends.trends_logic.trends_process import start_get_trends

CURRENT_DIR = os.path.dirname(__file__)


def setup_logging(path=os.path.join(CURRENT_DIR, "logging.yaml")):
    try:
        with open(path, "rt") as f:
            config = yaml.safe_load(f.read())
            logging.config.dictConfig(config)

    except FileNotFoundError as e:
        logging.warning(e)
        logging.warning("Error in logging configuration. Using default")
        logging.basicConfig(level=logging.INFO)


def create_app(is_start_get_trends=True):
    setup_logging()
    logger = logging.getLogger("comment_trends")
    logger.debug("About to create service content")
    app = Flask(__name__)
    app.register_blueprint(comment_trends, url_prefix="/")
    cache.init_app(app)
    if is_start_get_trends:
        start_get_trends()
    return app


if __name__ == "__main__":
    app_ = create_app()
    app_.run(host="0.0.0.0", port=8080)
