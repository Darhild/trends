import os
from types import SimpleNamespace

from alembic.config import Config
from alembic.script import ScriptDirectory

MODULE_PATH = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))


def get_alembic_config(db_url: str) -> Config:
    cmd_options = SimpleNamespace(
        config=os.path.join(MODULE_PATH, "alembic.ini"),
        db_url=db_url,
        name="alembic",
        raiseerr=False,
        rev_range=None,
        verbose=False,
        x=None,
    )

    config = Config(file_=cmd_options.config, cmd_opts=cmd_options)
    config.set_main_option("sqlalchemy.url", db_url)
    config.set_main_option(
        "script_location", os.path.join(MODULE_PATH, "trends", "alembic")
    )

    return config


def get_revisions(db_url):
    revisions_dir = ScriptDirectory.from_config(get_alembic_config(db_url))
    for revision in revisions_dir.walk_revisions("base", "heads"):
        yield revision
