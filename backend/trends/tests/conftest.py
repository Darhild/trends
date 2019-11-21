import os
import uuid

import pytest
from sqlalchemy_utils import create_database, drop_database
from yarl import URL

TESTS_DIR = os.path.dirname(__file__)


@pytest.fixture
def trends_json():
    """
    Get dummy data from json
    :return: trends structure as string
    """
    path = os.path.join(TESTS_DIR, 'data/response.json')
    with open(path) as f:
        return f.read()
