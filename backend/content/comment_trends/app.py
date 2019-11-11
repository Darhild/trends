from flask import Flask

from comment_trends.trends_logic.trends import cache, compute_trends
from comment_trends.trends_logic.trends_process import start_get_trends
from comment_trends.handlers.comment_trends import comment_trends


def create_app(db_url, is_start_get_trends=True):
    app = Flask(__name__)
    app.register_blueprint(comment_trends, url_prefix='/')
    cache.init_app(app)
    if is_start_get_trends:
        # compute_trends()
        start_get_trends()
    return app


if __name__ == '__main__':
    app_ = create_app(None)
    app_.run(host='0.0.0.0', port=8080)
