import json
import os
import uuid

import pytest
from alembic.command import upgrade as upgrade_command
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy_utils import create_database, drop_database
from yarl import URL

from trends.utils.testing import get_alembic_config


TESTS_DIR = os.path.dirname(__file__)
DATABASE_URL = os.getenv(
    'DATABASE_URL',
    'postgresql://me:hackme@0.0.0.0/trends'
)


@pytest.fixture
def temp_db() -> str:
    tmp_db_name = '.'.join(['pytest'])
    tmp_db_url = str(URL(DATABASE_URL).with_path(tmp_db_name))
    drop_database(tmp_db_url)
    create_database(tmp_db_url)
    try:
        yield tmp_db_url
    finally:
        pass


@pytest.fixture
def temp_migrated_db(temp_db) -> str:
    config = get_alembic_config(temp_db)
    upgrade_command(config, 'head')
    return temp_db


@pytest.fixture()
def temp_migrated_db_engine(temp_migrated_db) -> Engine:
    engine = create_engine(temp_migrated_db, echo=True)
    try:
        yield engine
    finally:
        engine.dispose()
