import logging
from json import JSONDecodeError
from pprint import pprint

import requests

from comment_trends.external_api.json_parse import parse_json

feed_logger = logging.getLogger(__name__)


class FeedRequest:
    url = "https://frontend.vh.yandex.ru/v23/feed.json"

    headers = {
        "Origin": "https://yandex.ru",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"
        " (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
    }

    query_params = {
        "filter": "carousels",
        "delete_filtered": "0",
        "synchronous_scheme": "1",
        "locale": "ru",
        "from": "efir",
        "service": "ya-main",
        "disable_trackings": "1",
        "num_docs": "1",
    }

    @classmethod
    def get_response(cls, tag, offset, limit, num_docs, cache_hash=None):

        params = cls.query_params.copy()
        params.update(
            {"offset": f"{offset}", "limit": f"{limit}"}  # "num_docs": f"{num_docs}",
        )

        if tag:
            params["tag"] = tag

        if cache_hash:
            params["cache_hash"] = cache_hash

        response = requests.request("GET", cls.url, headers=cls.headers, params=params)
        return FeedData(response)


class FeedData:
    def __init__(self, response):
        self.response_data = parse_json(response, logger=feed_logger)
        self.documents = dict()

    def _extract_documents_from_response(self):
        if not self.response_data:
            return {}

        for carousel in self.response_data["items"]:
            for document in carousel["includes"]:
                try:
                    content_id = document["content_id"]
                except KeyError as e:
                    feed_logger.debug("%s %s", type(e), e)
                    continue

                self.documents[content_id] = document

        return self.documents

    def _extract_carousel_ids_from_response(self):
        carouse_ids = []
        try:
            for carousel in self.response_data["items"]:
                carouse_ids.append(carousel["carousel_id"])
        except KeyError:
            pass

        return carouse_ids

    def get_documents(self):
        if self.documents:
            return self.documents

        return self._extract_documents_from_response()

    def get_cache_hash(self):
        pass

    def get_carousels(self):
        if not self.response_data:
            return []
        return self._extract_carousel_ids_from_response()


if __name__ == "__main__":
    fr = FeedRequest()
    result = fr.get_response(tag="movie", offset=0, limit=3, num_docs=1)
    pprint(result.get_documents())
    pprint(result.response_data)
    print(result.get_carousels())
