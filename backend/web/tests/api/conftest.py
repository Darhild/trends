import pytest

from trends.app import create_app


@pytest.fixture
def app(temp_db):
    app = create_app(temp_db)
    return app
