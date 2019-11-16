import pytest
from comment_trends.app import create_app


@pytest.fixture
def app():
    app = create_app(None, is_start_get_trends=False)
    return app


# @pytest.fixture()
# def client(app):
#     return app.test_client()
