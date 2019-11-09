import os

import requests


class FeedRequest:
    url = "https://frontend.vh.yandex.ru/v23/feed.json"
    headers = {
        'Origin': "https://yandex.ru",
        'Accept-Encoding': "gzip, deflate, br",
        'Accept-Language': "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
        'Accept': "application/json, text/javascript, */*; q=0.01",
    }

    query_params = {
        "delete_filtered": 0,
        "synchronous_scheme": 1,
        "locale": "ru",
        "from": "efir",
        "service": "ya-main",
        "disable_trackings": 1,
        "num_docs": 20,
    }

    @classmethod
    def get_response(cls, tag, offset, limit):

        params = cls.query_params.copy()
        params.update({"offset": f"{offset}",
                       "limit": f"{limit}",
                       "tag": tag})

        response = requests.request(
            "GET", cls.url, headers=cls.headers, params=params
        )
        return response
