import json
import datetime
import pytest

from trends.app import create_app
from trends.models.trends import content_table, trend_table


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
def efir_data_month(temp_migrated_db_engine):
    with open('tests/data/efir/out_efir_month.json') as f:
        return json.load(f)


@pytest.fixture(autouse=True)
def insert_efir_data_today(temp_migrated_db_engine):
    with open('tests/data/efir/input_efir_today.json') as f:
        with temp_migrated_db_engine.begin() as conn:
            data = [
                {
                    "category": key,
                    "data": value,
                    "created_at": datetime.datetime.now()
                }
                for key, value in json.load(f).items()
            ]
            conn.execute(content_table.insert(), *data)


@pytest.fixture(autouse=True)
def insert_efir_data_tomorrow(temp_migrated_db_engine):
    with open('tests/data/efir/input_efir_tomorrow.json') as f:
        with temp_migrated_db_engine.begin() as conn:
            data = [
                {
                    "category": key,
                    "data": value,
                    "created_at": datetime.datetime.now() - datetime.timedelta(days=1)
                }
                for key, value in json.load(f).items()
            ]
            conn.execute(content_table.insert(), *data)


@pytest.fixture(autouse=True)
def insert_efir_data_third_week(temp_migrated_db_engine):
    with open('tests/data/efir/input_efir_third_week.json') as f:
        with temp_migrated_db_engine.begin() as conn:
            data = [
                {
                    "category": key,
                    "data": value,
                    "created_at": datetime.datetime.now() - datetime.timedelta(days=17)
                }
                for key, value in json.load(f).items()
            ]
            conn.execute(content_table.insert(), *data)


# @pytest.fixture
# def insert_efir_data_week(temp_migrated_db_engine):
#     with open('tests/data/input_efir_week.json') as f:
#         with temp_migrated_db_engine.begin() as conn:
#             data = [
#                 {
#                     "category": key,
#                     "data": value,
#                     "created_at":  datetime.datetime.now() + datetime.timedelta(days=6)
#                 }
#                 for key, value in json.load(f).items()
#             ]
#             conn.execute(content_table.insert(), *data)
#         return data
#
#
# @pytest.fixture
# def insert_efir_data_month(temp_migrated_db_engine):
#     with open('tests/data/input_efir_month.json') as f:
#         with temp_migrated_db_engine.begin() as conn:
#             data = [
#                 {
#                     "category": key,
#                     "data": value,
#                     "created_at": datetime.datetime.now() + datetime.timedelta(days=20)
#                 }
#                 for key, value in json.load(f).items()
#             ]
#             conn.execute(content_table.insert(), *data)
#         return data

# def insert_content(self, content_json):

#         with conn.begin():
#             # print("repo insert content", json.loads(content_json))


# @pytest.fixture
# def input_efir_data():
#     with open('tests/data/input_efir.json') as f:
#         return json.load(f)

