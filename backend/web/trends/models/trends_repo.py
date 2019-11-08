from trends.models.trends import trends_table


class Repository:

    def __init__(self, db):
        self.db = db

<<<<<<< HEAD
<<<<<<< HEAD
    def insert(self, trend_json, source):
        with self.db.begin() as conn:
            with conn.begin():
                print("repo insert", trend_json)
                # conn.execute(trends_table.insert())
=======
    def insert(self, trend_json):
=======
    def insert(self, trend_json, source):
>>>>>>> Adding repo and collectors
        with self.db.begin() as conn:
            with conn.begin():
                print("repo insert", trend_json)
                conn.execute(trends_table.insert())
>>>>>>> Adding repo and collectors

    def read_all(self, limit=10):
        with self.db.begin() as conn:
            with conn.begin():
                pass
