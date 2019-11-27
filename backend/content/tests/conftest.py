import os

import pytest

TESTS_DIR = os.path.dirname(__file__)


@pytest.fixture
def trends_json():
    """
    Get dummy data from json
    :return: currency structure as string
    """
    path = os.path.join(TESTS_DIR, "data/response.json")
    with open(path) as f:
        return f.read()
