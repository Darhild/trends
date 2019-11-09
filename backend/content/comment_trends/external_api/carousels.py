import requests
from pprint import pprint
from json import JSONDecodeError
import logging

feed_logger = logging.getLogger(__name__)


class CarouselsRequest:
    url = "https://frontend.vh.yandex.ru/v23/carousels_videohub.json"

    headers = {
        'Origin': "https://yandex.ru",
        'Accept-Encoding': "gzip, deflate, br",
        'Accept-Language': "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"
                      " (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
        'Accept': "application/json, text/javascript, */*; q=0.01",
    }

    query_params = {
        "filter": "carousels",
        "delete_filtered": "0",
        "synchronous_scheme": "1",
        "locale": "ru",
        "from": "efir",
        "service": "ya-main",
        "disable_trackings": "1",
        "vitrina_limit": "1"}

    @classmethod
    def get_response(cls, tag, offset, limit, num_docs=None, cache_hash=None):

        params = cls.query_params.copy()
        params.update({"offset": f"{offset}",
                       "limit": f"{limit}"})

        if tag:
            params["tag"] = tag

        if cache_hash:
            params["cache_hash"] = cache_hash

        response = requests.request("GET", cls.url, headers=cls.headers, params=params)
        return CarouselsData(response)


class CarouselsData:
    def __init__(self, response):
        self.response = response
        self.carousels = dict()

    def _extract_carousels_from_response(self):
        try:
            data = self.response.json()
        except JSONDecodeError as e:
            feed_logger.debug(type(e), ',', e)
            return {}

        for carousel in data['carousels']:
            try:
                carousel_id = carousel['carousel_id']
            except KeyError as e:
                feed_logger.debug(type(e), ',', e)
                continue

            self.carousels[carousel_id] = carousel

        return self.carousels

    def get_carousels(self):
        if self.carousels:
            return self.carousels

        return self._extract_carousels_from_response()

    def get_cache_hash(self):
        pass


if __name__ == '__main__':
    cr = CarouselsRequest()
    result = cr.get_response(tag='sport', offset=0, limit=100)
    pprint(result.get_carousels().keys())
