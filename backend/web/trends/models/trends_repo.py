import json

from trends.models.trends import content_table, trend_table
from sqlalchemy import desc
import logging
from sqlalchemy.sql import select

from datetime import datetime, timedelta


class Repository:

    def __init__(self, db):
        self.db = db

    @staticmethod
    def get_time_zero(tz_delta):
        now = datetime.now()
        return now.replace(hour=tz_delta, minute=0)

    def insert_trend(self, trend_json):
        with self.db.begin() as conn:
            with conn.begin():
                data = {
                    "data": json.loads(trend_json)['data'],
                }

                time_zero = self.get_time_zero(0)
                delete_stmt = trend_table.delete() \
                    .where(trend_table.c.created_at > time_zero)
                result = conn.execute(delete_stmt)
                logging.getLogger(__name__). \
                    debug("%s entry were deleted", result.rowcount)
                data['created_at'] = datetime.utcnow()
                conn.execute(trend_table.insert(), **data)

    def insert_content(self, content_json):
        with self.db.begin() as conn:
            with conn.begin():
                # print("repo insert content", json.loads(content_json))
                data = [
                    {"category": key, "data": value}
                    for key, value in json.loads(content_json).items()
                ]
                time_zero = self.get_time_zero(0)
                delete_stmt = content_table.delete() \
                    .where(content_table.c.created_at > time_zero)
                result = conn.execute(delete_stmt)
                logging.getLogger(__name__). \
                    debug("%s entry were deleted", result.rowcount)
                conn.execute(content_table.insert(), *data)

    def read_all(self, limit, period):
        pass

    def trend_record_row_to_dict(self, trend_rec, source):
        """
        Returns:

        [
        {
            "day": 1,
            "data": {
                ...
            }
        },
        {
            "day": 22,
            "data": {
                ...
            }
        }
        ]"""

        result = []

        for trend in trend_rec[0]:
            d = dict(trend)

            # Надо ли мапить поля? Если каких то нет, то не добавлять этот тренд?

            # d['id'] = d['id']
            # d['title'] = d['title'].value
            # d['avatar'] = d['avatar'].value
            # d['description'] = d['description'].value
            # d['bg'] = d['bg'].value

            day = d.pop('day')
            d['source'] = source
            result.append({
                "day": day,
                "data": d}
            )
        return result

    def read_trend(self, period):
        with self.db.begin() as conn:
            with conn.begin():
                p = datetime.today() - timedelta(days=period)
                s = select([trend_table.c.data]). \
                    where(trend_table.c.created_at >= p). \
                    order_by(desc(trend_table.c.created_at))

                rows = conn.execute(s)

                result = []
                # Выбираем все, что вернули: строка - один день
                for trend in rows:
                    result += self.trend_record_row_to_dict(trend, source='google')

                logging.getLogger(__name__).info("google trends num rows: {0}".format(len(result)))
                return result

    def read_content(self, period, tag):
        with self.db.begin() as conn:
            with conn.begin():
                p = datetime.today() - timedelta(days=period)
                s = select([content_table.c.data]). \
                    where(content_table.c.created_at >= p). \
                    where(content_table.c.category == tag). \
                    order_by(desc(content_table.c.created_at))

                rows = conn.execute(s)

                result = []
                # Выбираем все, что вернули: строка - один день
                for trend in rows:
                    result += self.trend_record_row_to_dict(trend, source='efir')
                logging.getLogger(__name__).info("efir trends num rows: {0}".format(len(result)))
                return result
