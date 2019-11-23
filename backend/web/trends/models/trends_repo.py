import json
import logging
from datetime import datetime, timedelta

from sqlalchemy import desc, cast, Date
from sqlalchemy.sql import select

from trends.models.trends import content_table, trend_table, video_table
from trends.models.merging import group_by_title, update_old


class Repository:

    def __init__(self, db):
        self.db = db

    @staticmethod
    def _get_time_zero(tz_delta):
        now = datetime.now()
        return now.replace(hour=tz_delta, minute=0)

    @staticmethod
    def _date_validation(date):
        now = datetime.now()
        delta = timedelta(days=1)
        if now - delta <= date <= now + delta:
            return True
        else:
            logging.getLogger(__name__). \
                warning("Google has returned invalid date. "
                        "Is it still using the same format? "
                        "Canceling insertion")
            raise ValueError('Date %s is not valid' % str(date))

    @staticmethod
    def _format_google_date(google_date):
        date = datetime.strptime(google_date, "%Y%m%d")
        if Repository._date_validation(date):
            return date

    @staticmethod
    def video_record_row_to_dict(video_rec):
        """
        Returns:
        [
        {
            "day": 1,
            "data": {...}
        },
        {
            "day": 22,
            "data": {...}
        }
        ]"""

        result = []

        for trend in video_rec[0]:
            d = dict(trend)

            # Надо ли мапить поля? Если каких то нет, то не добавлять этот тренд?

            # d['id'] = d['id']
            # d['title'] = d['title'].value
            # d['avatar'] = d['avatar'].value
            # d['description'] = d['description'].value
            # d['bg'] = d['bg'].value
            comments_count = d["comments_count"]
            result.append({
                "day": int(comments_count),
                "data": d,
                "title": d["title"]
            }
            )
        return result

    @staticmethod
    def trend_record_row_to_dict(trend_rec, source):
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
                "data": d,
                "title": d["title"]
            }
            )
        return result

    def insert_trend(self, trend_json):
        with self.db.begin() as conn:
            with conn.begin():
                unpacked_json = json.loads(trend_json)
                data = {
                    "data": unpacked_json['data'],
                }
                date = Repository._format_google_date(unpacked_json['date'])

                logging.getLogger(__name__). \
                    debug("Got new google trends for %s date", date)

                delete_stmt = trend_table.delete() \
                    .where(cast(trend_table.c.created_at, Date)
                           == date.date())
                result = conn.execute(delete_stmt)
                data['created_at'] = date
                conn.execute(trend_table.insert(), **data)
                logging.getLogger(__name__). \
                    debug("%s entry were updated in trend_table", result.rowcount)

    def insert_content(self, content_json):
        with self.db.begin() as conn:
            with conn.begin():
                # print("repo insert content", json.loads(content_json))
                unpacked_json = json.loads(content_json)
                new_data = [
                    {"category": key, "data": value}
                    for key, value in json.loads(content_json).items()
                ]

                time_zero = self._get_time_zero(0)

                delete_stmt = content_table.delete() \
                    .where(content_table.c.created_at > time_zero) \
                    .returning(content_table.c.category, content_table.c.data)
                result = conn.execute(delete_stmt)

                if result.rowcount > 0:
                    old_data = result.fetchall()
                    new_data = update_old(unpacked_json, old_data)

                conn.execute(content_table.insert(), *new_data)

                logging.getLogger(__name__). \
                    debug("%s entry were updated in content_table", result.rowcount)

    def insert_video(self, video_json):
        with self.db.begin() as conn:
            with conn.begin():
                print("repo insert video", json.loads(video_json))
                data = [
                    {"category": key, "data": value}
                    for key, value in json.loads(video_json).items()
                ]
                time_zero = self._get_time_zero(0)

                delete_stmt = video_table.delete() \
                    .where(video_table.c.created_at > time_zero)
                result = conn.execute(delete_stmt)

                conn.execute(video_table.insert(), *data)

                logging.getLogger(__name__). \
                    debug("%s entry were updated in video_table", result.rowcount)

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
                    result.extend(self.trend_record_row_to_dict(trend, source='google'))

                result = group_by_title(result)
                logging.getLogger(__name__). \
                    info("google trends num rows: {0}".format(len(result)))
                return result

    def read_content(self, period, tag):
        with self.db.begin() as conn:
            with conn.begin():
                print(tag)

                p = datetime.today() - timedelta(days=period)
                s = select([content_table.c.data]). \
                    where(content_table.c.created_at >= p). \
                    where(content_table.c.category == tag). \
                    order_by(desc(content_table.c.created_at))

                rows = conn.execute(s)

                result = []
                # Выбираем все, что вернули: строка - один день
                for trend in rows:
                    result.extend(self.trend_record_row_to_dict(trend, source="efir"))

                result = group_by_title(result)

                logging.getLogger(__name__). \
                    info("efir trends num rows: {0}".format(len(result)))

                return result

    def read_videos(self, period, tag):
        with self.db.begin() as conn:
            with conn.begin():
                print(tag)
                p = datetime.today() - timedelta(days=period)
                s = select([video_table.c.data]). \
                    where(video_table.c.created_at >= p). \
                    where(video_table.c.category == tag). \
                    order_by(desc(video_table.c.created_at))

                rows = conn.execute(s)

                result = []
                # Выбираем все, что вернули: строка - один день
                for video in rows:
                    result.extend(self.video_record_row_to_dict(video))

                result = group_by_title(result)
                logging.getLogger(__name__). \
                    info("efir videos num rows: {0}".format(len(result)))
                return result
