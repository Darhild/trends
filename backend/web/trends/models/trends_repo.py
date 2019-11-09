from trends.models.trends import trends_table
import json


class Repository:

    def __init__(self, db):
        self.db = db

    def insert(self, trend_json, source):
        with self.db.begin() as conn:
            with conn.begin():
                print("repo insert", trend_json)
                # conn.execute(trends_table.insert())
                data = {
                    "source": source,
                    "data": str(json.loads(trend_json)['data']),
                }
                conn.execute(trends_table.insert(), **data)

    def read_all(self, limit=10):
        with self.db.begin() as conn:
            with conn.begin():
                pass
                a = conn.execute(trends_table.select().where(
                        trends_table.c.source == 'efir'
                )).fetchone()
                return a
