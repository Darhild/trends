import logging
from json import JSONDecodeError
from pprint import pprint

import requests
from requests import ConnectionError, Response

player_logger = logging.getLogger(__name__)


class PlayerRequest:
    """
    Ручка используется для получения тем документа(видео)
    """

    url = "https://frontend.vh.yandex.ru/v23/player/"

    query_params = {
        "synchronous_scheme": "1",
        "locale": "ru",
        "from": "efir",
        "service": "ya-main",
        "disable_trackings": "1",
    }

    headers = {
        "User-Agent": "PostmanRuntime/7.19.0",
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Host": "frontend.vh.yandex.ru",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive",
    }

    @classmethod
    def get_response(cls, document_id):

        try:
            response = requests.request(
                "GET",
                cls.url + f"{document_id}.json",
                headers=cls.headers,
                params=cls.query_params,
            )
        except ConnectionError as e:
            response = Response()
            player_logger.warning("Порвано соединение с ручкой player %s", e)
            response.status_code = 500
        return PlayerData(response)


class PlayerData:
    def __init__(self, response):
        self.themes = []
        self.response = response

    def _extract_themes_from_response(self):
        try:
            data = self.response.json()
            return data["content"]["themes"]
        except (KeyError, JSONDecodeError) as e:
            player_logger.debug("%s %s", type(e), e)
            return []

    def get_themes(self):
        if self.themes:
            return self.themes

        return self._extract_themes_from_response()


if __name__ == "__main__":
    pr = PlayerRequest()
    result = pr.get_response("4a63d9633de4bf3b8ffe7871ba780e34")
    pprint(result.response.json())
    pprint(result.get_themes())
