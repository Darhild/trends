import json

from trends.models.trends import content_table, trend_table


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


t = '''
{
  "": [
    {
      "id": "ChFoaHlxZmluY2RjbXN1emNoaBIDYWxsGh9tb3ZpZSZjb3VudHJ5X3VzYSZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Американские фильмы",
      "day": 1
    },
    {
      "id": "ChFoaGVyempsdW9rb3BrZ25oaBIDYWxsGh9tb3ZpZSZ5ZWFyXzIwMTB0aCZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Фильмы 2010-х годов",
      "day": 1
    },
    {
      "id": "ChJoaGpnZmJycGFncXdrd29iaGgSA2FsbBpWZW50aXR5X2xzdF9zbG1DalFLQkhSbGVIUVNMQ2h6WDJGamRHOXlPbkoxZHpNMk9EazJNRGdnZkNCelgyUnBjbVZqZEc5eU9uSjFkek0yT0RrMk1EZ3AgAQ==",
      "title": "Тео Джеймс фильмы",
      "day": 1
    },
    {
      "id": "ChJoaGdldW1uc3d6eXBxa29iaGgSA2FsbBojbW92aWUmZ2VucmVfZGV0ZWN0aXZlJnBvc3Rlcl9leGlzdHMgAQ==",
      "title": "Детективы",
      "day": 1
    },
    {
      "id": "ChJoaGVibmhlZ3BrdXl2Y2FjaGgSA2FsbBpGZW50aXR5X2xzdF9zbG1DaWdLQkhSbGVIUVNJSE5mWjJWdWNtVTZabWxzYlNBbUppQnpYMmRsYm5KbE9uSjFkek0xTVRVeiAB",
      "title": "Детективы",
      "day": 1
    },
    {
      "id": "ChJoaGJ1ZHl2aXR1dGhvcnliaGgSA2FsbBojbW92aWUmZ2VucmVfZmFudGFzdGljJnBvc3Rlcl9leGlzdHMgAQ==",
      "title": "Фантастика",
      "day": 1
    },
    {
      "id": "ChFoaGd6dnpyZXd1emJ1bGNoaBIDYWxsGlZlbnRpdHlfbHN0X3NsbUNqSUtCSFJsZUhRU0tpaHpYMkZqZEc5eU9uSjFkemczTVRjME9DQjhJSE5mWkdseVpXTjBiM0k2Y25WM09EY3hOelE0S1E9PSAB",
      "title": "Эшли Джадд фильмы",
      "day": 1
    },
    {
      "id": "ChJoaHh0Y2F2cnFrZm9yamNkaGgSA2FsbBpWZW50aXR5X2xzdF9zbG1DaklLQkhSbGVIUVNLaWh6WDJGamRHOXlPbkoxZHpNMk9EZzFPU0I4SUhOZlpHbHlaV04wYjNJNmNuVjNNelk0T0RVNUtRPT0gAQ==",
      "title": "Кейт Уинслет фильмы",
      "day": 1
    },
    {
      "id": "ChJoaGd1cmN6b3hoZndqamViaGgSA2FsbBojbW92aWUmZ2VucmVfYWR2ZW50dXJlJnBvc3Rlcl9leGlzdHMgAQ==",
      "title": "Приключения",
      "day": 1
    },
    {
      "id": "ChFoaHlncXFlY2R0cmVqYXRoaBIDYWxsGl5lbnRpdHlfbHN0X3NsbUNqb0tCSFJsZUhRU01uTmZaMlZ1Y21VNlptbHNiU0FtSmlCNlgyRmliM1YwT2lqUXNOQy8wTDdRdXRDdzBMdlF1TkMvMFlIUXVOR0IwWXNwIAE=",
      "title": "Фильмы про апокалипсисы",
      "day": 1
    },
    {
      "id": "ChFoaGlmb3d2dXpjeGx2c3doaBIDYWxsGiBtb3ZpZSZnZW5yZV9mYW1pbHkmcG9zdGVyX2V4aXN0cyAB",
      "title": "Семейное кино",
      "day": 0
    },
    {
      "id": "ChJoaHlqY3hreXBjeWRzcHhjaGgSA2FsbBpSZW50aXR5X2xzdF9zbG1DakFLQkhSbGVIUVNLQ2h6WDJGamRHOXlPbkoxZHpVeU9ERXdJSHdnYzE5a2FYSmxZM1J2Y2pweWRYYzFNamd4TUNrPSAB",
      "title": "Джулия Робертс фильмы",
      "day": 0
    },
    {
      "id": "ChJoaHFpc2d1bG9kb3ZkaGliaGgSA2FsbBpOZW50aXR5X2xzdF9zbG1DaXdLQkhSbGVIUVNKSE5mWjJWdWNtVTZabWxzYlNBbUppQjZYMkZpYjNWME9palF0TkMxMFlMUmo5QzhLUT09IAE=",
      "title": "Фильмы про детей",
      "day": 0
    },
    {
      "id": "ChJoaGRtc2RuanlhZ3RjZGFkaGgSA2FsbBqCAWVudGl0eV9sc3Rfc2xtQ2pnS0JIUmxlSFFTTUhOZlkyOTFiblJ5ZVRweWRYYzJNemdnSmlZZ2MxOW5aVzV5WlRwbWFXeHRJQ1ltSUhOZmEzQmZkR2xsY2pJNk1Rb2FDZ1Z5Wld4bGRoSVJabTl5YlhWc1lUMXJjRjl5WVhScGJtYz0gAQ==",
      "title": "Американские фильмы",
      "day": 0
    },
    {
      "id": "ChFoaG1zemZic3Fva3dzYWRoaBIDYWxsGh9tb3ZpZSZnZW5yZV9kcmFtYSZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Драма",
      "day": 0
    },
    {
      "id": "ChJoaGFvdHVoYWpsbmZ6Y2piaGgSA2FsbBpmZW50aXR5X2xzdF9zbG1DajRLQkhSbGVIUVNObk5mWTI5MWJuUnllVHBtYjNKbGFXZHVJQ1ltSUhOZloyVnVjbVU2Wm1sc2JTQW1KaUJ6WDJkbGJuSmxPbkoxZHpnd056TTNOQT09IAE=",
      "title": "Зарубежные драмы",
      "day": 0
    },
    {
      "id": "ChJoaHNxc2d1aGVyeWx1YmRkaGgSA2FsbBoUZW50aXR5X2xzdGVjNTlkYjhfXzAgAQ==",
      "title": "Лауреаты премии «Белый слон»",
      "day": 0
    },
    {
      "id": "ChFoaHhxYmppb3hoeHJvc3JoaBIDYWxsGiJtb3ZpZSZjb3VudHJ5X2ZyYW5jZSZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Французские фильмы",
      "day": 0
    },
    {
      "id": "ChJoaGFubG9rZGJ2cnFiYXBjaGgSA2FsbBojbW92aWUmY291bnRyeV9nZXJtYW55JnBvc3Rlcl9leGlzdHMgAQ==",
      "title": "Немецкие фильмы",
      "day": 0
    },
    {
      "id": "ChJoaHdramFpc2NiaHVjeGljaGgSA2FsbBpGZW50aXR5X2xzdF9zbG1DaWdLQkhSbGVIUVNJSE5mWjJWdWNtVTZabWxzYlNBbUppQjZYMkZpYjNWME9palF2TkN3MEx3cCAB",
      "title": "Фильмы про мам",
      "day": 0
    },
    {
      "id": "ChFoaHdmbm5zenh1ZW1wc2NoaBIDYWxsGh9tb3ZpZSZ5ZWFyXzIwMDB0aCZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Фильмы 2000-х годов",
      "day": 0
    },
    {
      "id": "ChJoaHhpbnJnbHN6Zmdra2dkaGgSA2FsbBohbW92aWUmcmVnaW9uX2V1cm9wZSZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Европейское кино",
      "day": 0
    },
    {
      "id": "ChFoaHR0YXNwYXR6dGNld2NoaBIDYWxsGmplbnRpdHlfbHN0X3NsbUNrSUtCSFJsZUhRU09paHpYMkZqZEc5eU9uSjFkekk1TnpnNE5pQjhJSE5mWkdseVpXTjBiM0k2Y25WM01qazNPRGcyS1NBbUppQnpYMmRsYm5KbE9tWnBiRzA9IAE=",
      "title": "Изабель Юппер фильмы",
      "day": 0
    }
  ],
  "kids": [
    {
      "id": "ChJoaG9uc3JoYmpyam9maGdkaGgSA2FsbBonY2FydG9vbiZjb3VudHJ5X3Vzc3Ima2lkcyZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Советские мультфильмы",
      "day": 0
    },
    {
      "id": "ChJoaHVsY3R6dGlidHZidXFiaGgSA2FsbBoiY2FydG9vbiZnZW5yZV9mYW1pbHkmcG9zdGVyX2V4aXN0cyAB",
      "title": "Семейные мультфильмы",
      "day": 0
    },
    {
      "id": "ChJoaG9rb2hub2JoZnZrYWhkaGgSA2FsbBojY2FydG9vbiZnZW5yZV9mYW50YXN5JnBvc3Rlcl9leGlzdHMgAQ==",
      "title": "Фэнтези",
      "day": 0
    },
    {
      "id": "ChJoaG1zYWd2ZW1odnhiam5jaGgSA2FsbBoiY2FydG9vbiZnZW5yZV9jb21lZHkmcG9zdGVyX2V4aXN0cyAB",
      "title": "Комедии",
      "day": 0
    },
    {
      "id": "ChJoaHlreWVmbm10bmVocWRjaGgSA2FsbBolY2FydG9vbiZnZW5yZV9hZHZlbnR1cmUmcG9zdGVyX2V4aXN0cyAB",
      "title": "Приключения",
      "day": 0
    },
    {
      "id": "ChFoaHl1eXJ0a2Rkb3VxbGZoaBIDYWxsGlZlbnRpdHlfbHN0X3NsbUNqTUtCSFJsZUhRU0szTmZaMlZ1Y21VNmNuVjNPREUxTXlBbUppQjZYM2RvYVdOb09palJnZEM4MExYUmlOQzkwWXZRdFNrPSAB",
      "title": "Смешные аниме",
      "day": 0
    },
    {
      "id": "ChFoaHdvZWhxcHdicW1idmhoaBIDYWxsGjJjYXJ0b29uX3Nlcmllc19pZF80Y2Y3YjA3NmQ5YzNhNTZkODVkY2UwNzFjZjBmNjA2NiAB",
      "title": "Маша и Медведь",
      "day": 0
    },
    {
      "id": "ChJoaHpnY25idmZ6dmhqYXpiaGgSA2FsbBoyY2FydG9vbl9zZXJpZXNfaWRfNDg0OWMxNThjMjg3MGE5ZDgyMDFmYWVkZTBjNmE1MTEgAQ==",
      "title": "Щенячий патруль",
      "day": 0
    }
  ],
  "blogger": [
    {
      "id": "ChFoaGJkYXdrYWtjb211ZXFoaBIDYWxsGgdibG9nZ2VyIAE=",
      "title": "Блогеры",
      "day": 0
    },
    {
      "id": "ChFoaGNyYnZkdGxqcmhueWRoaBIDYWxsGgp0aGVtZV9hdnRvIAE=",
      "title": "Авто",
      "day": 0
    },
    {
      "id": "ChJoaHVlb3R5c3B5bnphYXBjaGgSA2FsbBoOdWdjX3RoZW1lX2F2dG8gAQ==",
      "title": "Автомобили",
      "day": 0
    }
  ],
  "movie": [
    {
      "id": "ChFoaGVyempsdW9rb3BrZ25oaBIDYWxsGh9tb3ZpZSZ5ZWFyXzIwMTB0aCZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Фильмы 2010-х годов",
      "day": 3
    },
    {
      "id": "ChFoaHhxYmppb3hoeHJvc3JoaBIDYWxsGiJtb3ZpZSZjb3VudHJ5X2ZyYW5jZSZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Французские фильмы",
      "day": 2
    },
    {
      "id": "ChJoaGlpbGJ5eW15cGt1ZWpjaGgSA2FsbBoVY29sbGVjdGlvbl9nYWxpbmFfYm9iIAE=",
      "title": "Галина Боб рекомендует",
      "day": 2
    },
    {
      "id": "ChJoaG5wcW9laWFyeHJpZ2JiaGgSA2FsbBoXY29sbGVjdGlvbl91dG9waWphX3Nob3UgAQ==",
      "title": "Утопия Шоу рекомендует",
      "day": 2
    },
    {
      "id": "ChJoaHhpbnJnbHN6Zmdra2dkaGgSA2FsbBohbW92aWUmcmVnaW9uX2V1cm9wZSZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Европейское кино",
      "day": 2
    },
    {
      "id": "ChFoaHFwdml6YnZkcXF3dGdoaBIDYWxsGhxjb2xsZWN0aW9uX3phcnViZXpobnllX2RyYW15IAE=",
      "title": "Зарубежные драмы",
      "day": 2
    },
    {
      "id": "ChJoaHRvaGJ5d2F3a2VxamNiaGgSA2FsbBpWZW50aXR5X2xzdF9zbG1DaklLQkhSbGVIUVNLbk5mWjJWdWNtVTZabWxzYlNBbUppQjZYM2RvYVdOb09palFzOUdBMFlQUmdkR0MwTDNSaTlDNUtRPT0gAQ==",
      "title": "Грустные фильмы",
      "day": 2
    },
    {
      "id": "ChJoaGhxcmVwcHRta2xpbnViaGgSA2FsbBpOZW50aXR5X2xzdF9zbG1DaXdLQkhSbGVIUVNKSE5mWjJWdWNtVTZabWxzYlNBbUppQjZYMkZpYjNWME9palF0dEM0MExmUXZkR01LUT09IAE=",
      "title": "Фильмы про жизнь",
      "day": 2
    },
    {
      "id": "ChFoaHduYW1wbWltamtrdm9oaBIDYWxsGiBtb3ZpZSZnZW5yZV9jb21lZHkmcG9zdGVyX2V4aXN0cyAB",
      "title": "Комедии",
      "day": 2
    },
    {
      "id": "ChFoaG1zemZic3Fva3dzYWRoaBIDYWxsGh9tb3ZpZSZnZW5yZV9kcmFtYSZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Драма",
      "day": 2
    },
    {
      "id": "ChFoaHBzZG11ZmFic3lyc3BoaBIDYWxsGiNtb3ZpZSZnZW5yZV9iaW9ncmFwaHkmcG9zdGVyX2V4aXN0cyAB",
      "title": "Биографические фильмы",
      "day": 2
    },
    {
      "id": "ChJoaGFvdHVoYWpsbmZ6Y2piaGgSA2FsbBpmZW50aXR5X2xzdF9zbG1DajRLQkhSbGVIUVNObk5mWTI5MWJuUnllVHBtYjNKbGFXZHVJQ1ltSUhOZloyVnVjbVU2Wm1sc2JTQW1KaUJ6WDJkbGJuSmxPbkoxZHpnd056TTNOQT09IAE=",
      "title": "Зарубежные драмы",
      "day": 2
    },
    {
      "id": "ChJoaHNzdGh3ZWxyenZ0c25jaGgSA2FsbBoUZW50aXR5X2xzdGQ0MjUxOGNfXzAgAQ==",
      "title": "Фильмы про подростков",
      "day": 2
    },
    {
      "id": "ChJoaGpnZmJycGFncXdrd29iaGgSA2FsbBpWZW50aXR5X2xzdF9zbG1DalFLQkhSbGVIUVNMQ2h6WDJGamRHOXlPbkoxZHpNMk9EazJNRGdnZkNCelgyUnBjbVZqZEc5eU9uSjFkek0yT0RrMk1EZ3AgAQ==",
      "title": "Тео Джеймс фильмы",
      "day": 1
    },
    {
      "id": "ChJoaGdldW1uc3d6eXBxa29iaGgSA2FsbBojbW92aWUmZ2VucmVfZGV0ZWN0aXZlJnBvc3Rlcl9leGlzdHMgAQ==",
      "title": "Детективы",
      "day": 1
    },
    {
      "id": "ChFoaHlxZmluY2RjbXN1emNoaBIDYWxsGh9tb3ZpZSZjb3VudHJ5X3VzYSZwb3N0ZXJfZXhpc3RzIAE=",
      "title": "Американские фильмы",
      "day": 1
    },
    {
      "id": "ChJoaGVibmhlZ3BrdXl2Y2FjaGgSA2FsbBpGZW50aXR5X2xzdF9zbG1DaWdLQkhSbGVIUVNJSE5mWjJWdWNtVTZabWxzYlNBbUppQnpYMmRsYm5KbE9uSjFkek0xTVRVeiAB",
      "title": "Детективы",
      "day": 1
    },
    {
      "id": "ChJoaGJ1ZHl2aXR1dGhvcnliaGgSA2FsbBojbW92aWUmZ2VucmVfZmFudGFzdGljJnBvc3Rlcl9leGlzdHMgAQ==",
      "title": "Фантастика",
      "day": 1
    },
    {
      "id": "ChFoaGd6dnpyZXd1emJ1bGNoaBIDYWxsGlZlbnRpdHlfbHN0X3NsbUNqSUtCSFJsZUhRU0tpaHpYMkZqZEc5eU9uSjFkemczTVRjME9DQjhJSE5mWkdseVpXTjBiM0k2Y25WM09EY3hOelE0S1E9PSAB",
      "title": "Эшли Джадд фильмы",
      "day": 1
    },
    {
      "id": "ChJoaHh0Y2F2cnFrZm9yamNkaGgSA2FsbBpWZW50aXR5X2xzdF9zbG1DaklLQkhSbGVIUVNLaWh6WDJGamRHOXlPbkoxZHpNMk9EZzFPU0I4SUhOZlpHbHlaV04wYjNJNmNuVjNNelk0T0RVNUtRPT0gAQ==",
      "title": "Кейт Уинслет фильмы",
      "day": 1
    },
    {
      "id": "ChJoaGd1cmN6b3hoZndqamViaGgSA2FsbBojbW92aWUmZ2VucmVfYWR2ZW50dXJlJnBvc3Rlcl9leGlzdHMgAQ==",
      "title": "Приключения",
      "day": 1
    },
    {
      "id": "ChFoaHlncXFlY2R0cmVqYXRoaBIDYWxsGl5lbnRpdHlfbHN0X3NsbUNqb0tCSFJsZUhRU01uTmZaMlZ1Y21VNlptbHNiU0FtSmlCNlgyRmliM1YwT2lqUXNOQy8wTDdRdXRDdzBMdlF1TkMvMFlIUXVOR0IwWXNwIAE=",
      "title": "Фильмы про апокалипсисы",
      "day": 1
    },
    {
      "id": "ChFoaGlmb3d2dXpjeGx2c3doaBIDYWxsGiBtb3ZpZSZnZW5yZV9mYW1pbHkmcG9zdGVyX2V4aXN0cyAB",
      "title": "Семейное кино",
      "day": 0
    },
    {
      "id": "ChJoaHlqY3hreXBjeWRzcHhjaGgSA2FsbBpSZW50aXR5X2xzdF9zbG1DakFLQkhSbGVIUVNLQ2h6WDJGamRHOXlPbkoxZHpVeU9ERXdJSHdnYzE5a2FYSmxZM1J2Y2pweWRYYzFNamd4TUNrPSAB",
      "title": "Джулия Робертс фильмы",
      "day": 0
    },
    {
      "id": "ChJoaHFpc2d1bG9kb3ZkaGliaGgSA2FsbBpOZW50aXR5X2xzdF9zbG1DaXdLQkhSbGVIUVNKSE5mWjJWdWNtVTZabWxzYlNBbUppQjZYMkZpYjNWME9palF0TkMxMFlMUmo5QzhLUT09IAE=",
      "title": "Фильмы про детей",
      "day": 0
    },
    {
      "id": "ChJoaGRtc2RuanlhZ3RjZGFkaGgSA2FsbBqCAWVudGl0eV9sc3Rfc2xtQ2pnS0JIUmxlSFFTTUhOZlkyOTFiblJ5ZVRweWRYYzJNemdnSmlZZ2MxOW5aVzV5WlRwbWFXeHRJQ1ltSUhOZmEzQmZkR2xsY2pJNk1Rb2FDZ1Z5Wld4bGRoSVJabTl5YlhWc1lUMXJjRjl5WVhScGJtYz0gAQ==",
      "title": "Американские фильмы",
      "day": 0
    }
  ],
  "series": [
    {
      "id": "ChJoaHd2cnVsZWZlbXF3Y3ljaGgSA2FsbBoqc2VyaWVzX2lkXzQ4YjJjMzdiNjUzZDVkMjA5ODBiNWUwYzRlNTk1MTE4IAE=",
      "title": "СМЕРШ",
      "day": 0
    },
    {
      "id": "ChJoaGt6endob3B5cXp4cm5kaGgSA2FsbBoqc2VyaWVzX2lkXzQ5YmQ2Yzg4NzkwOGFlMzhiMDk2Mzg1MjgzZmMzMWRkIAE=",
      "title": "Капитанша",
      "day": 0
    },
    {
      "id": "ChJoaHpxdmR3Ym9oeXNia2liaGgSA2FsbBoqc2VyaWVzX2lkXzRiZWIxZmE3NTNiNDk1YzE5NjI4ZjkwZGNiYWE0MjczIAE=",
      "title": "Место встречи изменить нельзя",
      "day": 0
    },
    {
      "id": "ChFoaGhrZXdjc2lsYW9qdGpoaBIDYWxsGipzZXJpZXNfaWRfNDkwMTc4NjgxZmI4YjkxODhhZmVlZWNkNmYzMDk0OWYgAQ==",
      "title": "Тайны Бермудского треугольника",
      "day": 0
    }
  ],
  "sport": [
    {
      "id": "ChFoaHpscXloeXhsdXpjcGVoaBIDYWxsGhdzcG9ydF9ob2NrZXlfdGVhbV84MDg0NiAB",
      "title": "Вашингтон Кэпиталз",
      "day": 0
    },
    {
      "id": "ChJoaGhvYnhtZ3R3dG5saXFiaGgSA2FsbBoZc3BvcnRfaG9ja2V5X2dyb3VwX3Zvc3RvayAB",
      "title": "Восточная конференция",
      "day": 0
    },
    {
      "id": "ChJoaHRxdmZ0ZWhoZmJwa2JjaGgSA2FsbBoXc3BvcnRfaG9ja2V5X3RlYW1fODA4NDQgAQ==",
      "title": "Торонто Мейпл Лифс",
      "day": 0
    },
    {
      "id": "ChJoaG51a3lhbWNhYnlpaGJiaGgSA2FsbBobc3BvcnRfaG9ja2V5X2Z1bGxfdGltZV9nYW1lIAE=",
      "title": "Записи матчей",
      "day": 0
    },
    {
      "id": "ChFoaGdyZWlvd3J5cG5ndHhoaBIDYWxsGhtzcG9ydF9ob2NrZXlfcnVzc2lhbl9wbGF5ZXIgAQ==",
      "title": "Российские игроки",
      "day": 0
    },
    {
      "id": "ChFoaHdkcHp6bHdncXdtamZoaBIDYWxsGhxzcG9ydF9ob2NrZXlfc2Vhc29uXzIwMTkyMDIwIAE=",
      "title": "Сезон 2019/2020",
      "day": 0
    },
    {
      "id": "ChFoaGR3dWhweHRqcm14YnNoaBIDYWxsGgVzcG9ydCAB",
      "title": "Cпорт",
      "day": 0
    },
    {
      "id": "ChJoaGVxbXZxY2x1Z3luZ2NkaGgSA2FsbBoZc3BvcnRfaG9ja2V5X3R5cGVfcmVndWxhciAB",
      "title": "Регулярный чемпионат",
      "day": 0
    },
    {
      "id": "ChJoaGN5emt2Z2t0c2lndG5iaGgSA2FsbBoXc3BvcnRfaG9ja2V5X3RlYW1fODA3OTQgAQ==",
      "title": "Калгари Флэймз",
      "day": 0
    }
  ]
}
'''

t2 = '''
{  
   "data":[  
      {  
         "title":"Рик и Морти",
         "avatar":"https://t0.gstatic.com/images?q=tbn:ANd9GcSMN17LPz6RymHG6RED0RUcE3PKKGsKWHq5HngGr0ecJjhzLblJRolYcQ3TaSMbEk1NhAiEh47o",
         "description":"Проект  Женщина-Халк  возглавит сценаристка  Рика и Морти ",
         "day":50000
      },
      {  
         "title":"Соколов СПбГУ",
         "avatar":"https://t3.gstatic.com/images?q=tbn:ANd9GcTis4rWurfGMD0cHpXXPKgtH9cYwF7LcDI5SD_0Waz1X0DRYwkfNyyelJeYaJjCe6n_5gJLaD7h",
         "description":"Историк Соколов попросил камеру с телевизором",
         "day":5000
      }
   ]
}
'''


def read_efir_trends(data, tag, top):
    all_trends = json.loads(data)
    filtered = []

    if tag == "":
        for key, trends in all_trends.items():
            filtered = filtered + trends
    else:
        filtered = all_trends[tag]

    filtered = sorted(filtered, key=lambda x: x["day"], reverse=True)
    result = []
    for trend in filtered[:top]:
        result.append({
            "id": trend.get("id", ""),
            "title": trend.get("title", ""),
            "avatar": trend.get("avatar", ""),
            "description": trend.get("description", ""),
            "bg": trend.get("bg", "")
        })

    return result


print(read_efir_trends(t, "", 2))
