import os

import pytest
from alembic.command import downgrade, upgrade
from sqlalchemy.engine import Engine, create_engine

from tests.conftest import DATABASE_URL
from trends.utils.testing import get_alembic_config, get_revisions

REVISIONS = list(get_revisions(DATABASE_URL))
MODULE_PATH = os.path.dirname(os.path.dirname(__file__))


@pytest.fixture()
def temp_db_engine(temp_db) -> Engine:
    engine = create_engine(temp_db, echo=True)
    try:
        yield engine
    finally:
        engine.dispose()


@pytest.mark.parametrize("rev_index", reversed(range(len(REVISIONS))))
def test_migrations_stairway(temp_db_engine: Engine, rev_index: int):
    revision = REVISIONS[rev_index]

    config = get_alembic_config(str(temp_db_engine.url))
    upgrade(config, revision.revision)
    downgrade(config, revision.down_revision or "-1")
    upgrade(config, revision.revision)
