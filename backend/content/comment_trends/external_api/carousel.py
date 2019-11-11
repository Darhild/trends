import requests
from pprint import pprint
from json import JSONDecodeError
import logging

carousel_logger = logging.getLogger(__name__)


class CarouselRequest:
    """
    Ручка возвращает данные по документам в карусели
    carousel_id - id карусели
    offset - первый индекс в массиве документов карусели
    limit - последний индекс в массиве документов карусели
    т.е limit - offset задаёт число документов, который должен вернуть запрос
    """

    url = "https://frontend.vh.yandex.ru/v23/carousel_videohub.json"

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
        "disable_trackings": "1"}

    @classmethod
    def get_response(cls, carousel_id, offset, limit):

        params = cls.query_params.copy()
        params.update({"offset": f"{offset}",
                       "limit": f"{limit}",
                       "carousel_id": f"{carousel_id}"})

        response = requests.request("GET", cls.url, headers=cls.headers, params=params)
        return CarouselData(response)


class CarouselData:
    def __init__(self, response):
        self.response_data = CarouselData.parse_json(response)
        self.documents = dict()

    @staticmethod
    def parse_json(response):
        try:
            data = response.json()
        except JSONDecodeError as e:
            carousel_logger.debug(type(e), ',', e)
            return {}
        return data

    def _extract_documents_from_response(self):
        if not self.response_data:
            return {}

        for document in self.response_data['set']:
            try:
                content_id = document['content_id']
            except KeyError as e:
                carousel_logger.debug(type(e), ',', e)
                continue

            self.documents[content_id] = document

        return self.documents

    def get_documents(self):
        if self.documents:
            return self.documents

        return self._extract_documents_from_response()

    def get_cache_hash(self):
        try:
            return self.response_data['cache_hash']
        except KeyError:
            return ''


if __name__ == '__main__':
    cr_id = 'ChJoaHhpbnJnbHN6Zmdra2dkaGgSBW1vdmllGiFtb3ZpZSZyZWdpb25fZXVyb3BlJnBvc3Rlcl9leGlzdHMgAQ=='
    cr = CarouselRequest.get_response(cr_id, offset=0, limit=2)
    pprint(cr.get_documents())
    print(cr.get_cache_hash())
