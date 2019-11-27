import logging
from pprint import pprint

import requests

from comment_trends.external_api.json_parse import parse_json

theme_logger = logging.getLogger(__name__)


class ThemeRequest:

    url = "https://frontend.vh.yandex.ru/v23/theme"

    headers = {
        "Origin": "https://yandex.ru",
        "User-Agent": "PostmanRuntime/7.19.0",
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive",
        "cache-control": "no-cache",
    }

    query_params = {
        "synchronous_scheme": "1",
        "locale": "ru",
        "from": "efir",
        "service": "ya-main",
        "disable_trackings": "1",
    }

    @classmethod
    def get_response(cls, theme_id):

        params = cls.query_params.copy()
        params.update({"theme_id": f"{theme_id}"})
        response = requests.request("GET", cls.url, headers=cls.headers, params=params)
        return ThemeData(response)


class ThemeData:
    def __init__(self, response):
        self.response_data = parse_json(response, logger=theme_logger)

    def get_info(self):

        try:
            content = self.response_data["content"]
        except (TypeError, KeyError) as e:
            theme_logger.debug("%s %s", type(e), e)
            content = {}

        for field in ("bg", "avatar", "description"):
            if field not in content:
                content[field] = ""

        return content


if __name__ == "__main__":
    tr_id = "ChJoaGNjdmhibHJ1anpsbGtiaGgSF3Nwb3J0X2hvY2tleV9sZWFndWVfbmhsGhdzcG9ydF9ob2NrZXlfdGVhbV84MDgwNyAB"
    tr = ThemeRequest.get_response(tr_id)
    pprint(tr.get_info())
