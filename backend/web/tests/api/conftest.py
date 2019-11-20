import json
import datetime
import pytest

from trends.app import create_app
from trends.models.trends import content_table, trend_table


def insert_efir_in_db(temp_migrated_db_engine, file, date):
    with open(file) as f:
        with temp_migrated_db_engine.begin() as conn:
            data = [
                {
                    "category": key,
                    "data": value,
                    "created_at": date
                }
                for key, value in json.load(f).items()
            ]
            conn.execute(content_table.insert(), *data)


def insert_google_in_db(temp_migrated_db_engine, file, date):
    with open(file) as f:
        with temp_migrated_db_engine.begin() as conn:
            data = {
                "data": json.load(f),
                "created_at": date
            }
            conn.execute(trend_table.insert(), **data)


@pytest.fixture
def app(temp_db):
    app = create_app(temp_db)
    return app


@pytest.fixture
def efir_data_today():
    with open('tests/data/efir/out_efir_today.json') as f:
        return json.load(f)


@pytest.fixture
def efir_data_week(temp_migrated_db_engine):
    with open('tests/data/efir/out_efir_week.json') as f:
        return json.load(f)


@pytest.fixture
def efir_data_month():
    with open('tests/data/efir/out_efir_month.json') as f:
        return json.load(f)


@pytest.fixture
def google_data_today():
    with open('tests/data/google/out_google_today.json') as f:
        return json.load(f)


@pytest.fixture
def google_data_week():
    with open('tests/data/google/out_google_week.json') as f:
        return json.load(f)


@pytest.fixture
def google_data_month():
    with open('tests/data/google/out_google_month.json') as f:
        return json.load(f)


@pytest.fixture
def mix_data_today():
    with open('tests/data/mix/out_mix_today.json') as f:
        return json.load(f)


@pytest.fixture
def mix_data_week():
    with open('tests/data/mix/out_mix_week.json') as f:
        return json.load(f)


@pytest.fixture
def mix_data_month():
    with open('tests/data/mix/out_mix_month.json') as f:
        return json.load(f)


@pytest.fixture(autouse=True)
def insert_efir_data_today(temp_migrated_db_engine):
    date = datetime.datetime.now()
    file = 'tests/data/efir/input_efir_today.json'
    insert_efir_in_db(temp_migrated_db_engine, file=file, date=date)


@pytest.fixture(autouse=True)
def insert_efir_data_tomorrow(temp_migrated_db_engine):
    date = datetime.datetime.now() - datetime.timedelta(days=1)
    file = 'tests/data/efir/input_efir_tomorrow.json'
    insert_efir_in_db(temp_migrated_db_engine, file=file, date=date)


@pytest.fixture(autouse=True)
def insert_efir_data_second_week(temp_migrated_db_engine):
    date = datetime.datetime.now() - datetime.timedelta(days=8)
    file = 'tests/data/efir/input_efir_second_week.json'
    insert_efir_in_db(temp_migrated_db_engine, file=file, date=date)


@pytest.fixture(autouse=True)
def insert_google_data_today(temp_migrated_db_engine):
    date = datetime.datetime.now()
    file = 'tests/data/google/input_google_today.json'
    insert_google_in_db(temp_migrated_db_engine, file=file, date=date)


@pytest.fixture(autouse=True)
def insert_google_data_tomorrow(temp_migrated_db_engine):
    date = datetime.datetime.now() - datetime.timedelta(days=1)
    file = 'tests/data/google/input_google_tomorrow.json'
    insert_google_in_db(temp_migrated_db_engine, file=file, date=date)


@pytest.fixture(autouse=True)
def insert_google_data_second_week(temp_migrated_db_engine):
    date = datetime.datetime.now() - datetime.timedelta(days=8)
    file = 'tests/data/google/input_google_second_week.json'
    insert_google_in_db(temp_migrated_db_engine, file=file, date=date)
