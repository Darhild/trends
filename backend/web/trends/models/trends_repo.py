from trends.models.trends import content_table, trend_table
import json


class Repository:

    def __init__(self, db):
        self.db = db

    def insert_trend(self, trend_json):
        with self.db.begin() as conn:
            with conn.begin():
                print("repo insert trend", json.loads(trend_json))
                data = {
                    "data": json.loads(trend_json)['data'],
                }
                conn.execute(trend_table.insert(), **data)

    def insert_content(self, content_json):
        with self.db.begin() as conn:
            with conn.begin():
                print("repo insert content", json.loads(content_json))
                data = [
                    {"category": key, "data": value}
                    for key, value in json.loads(content_json).items()
                ]
                conn.execute(content_table.insert(), *data)

    def read_all(self, limit=10):
        with self.db.begin() as conn:
            with conn.begin():
                pass
                # a = conn.execute(trends_table.select().where(
                #         trends_table.c.source == 'efir'
                # )).fetchone()
                # return a
