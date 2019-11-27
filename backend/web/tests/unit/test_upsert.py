import os
from unittest.mock import patch

import pytest
from sqlalchemy import create_engine, select

from trends.models.trends import trend_table
from trends.models.trends_repo import Repository

TESTS_DIR = os.path.dirname(os.path.dirname(__file__))


@pytest.fixture
def google_trends_yesterday():
    path = os.path.join(TESTS_DIR, "data/google/input_google_upsert_yesterday.json")
    with open(path) as f:
        return f.read()


@pytest.fixture
def google_trends_today():
    path = os.path.join(TESTS_DIR, "data/google/input_google_upsert_today.json")
    with open(path) as f:
        return f.read()


def test_insert_trends_one_day(temp_migrated_db, google_trends_today):
    """
        It always should be only one entry for one day
    """
    engine = create_engine(temp_migrated_db, echo=True)
    repository = Repository(engine)
    repository.insert_trend(google_trends_today)

    with engine.begin() as conn:
        with conn.begin():
            result = conn.execute(trend_table.select()).fetchall()
    assert len(result) == 1

    repository.insert_trend(google_trends_today)

    with engine.begin() as conn:
        with conn.begin():
            result = conn.execute(trend_table.select()).fetchall()
    assert len(result) == 1


@patch("trends.models.trends_repo.Repository.date_validation")
def test_insert_trends_two_days(
    mock_validation, temp_migrated_db, google_trends_today, google_trends_yesterday
):
    """
    Entry for next day shouldn't  wipe out entry for previous day
    """
    engine = create_engine(temp_migrated_db, echo=True)
    repository = Repository(engine)
    mock_validation.return_value = True

    repository.insert_trend(google_trends_yesterday)
    with engine.begin() as conn:
        with conn.begin():
            result = conn.execute(trend_table.select()).fetchall()
    assert len(result) == 1
    yesterday_trends = result[0]

    repository.insert_trend(google_trends_today)
    with engine.begin() as conn:
        with conn.begin():
            result = conn.execute(trend_table.select()).fetchall()
    assert len(result) == 2
    assert yesterday_trends == result[0]
