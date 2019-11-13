import requests
from pprint import pprint
from json import JSONDecodeError
import logging

collection_logger = logging.getLogger(__name__)


class CollectionRequest:
    """
    Ручка возвращает данные по документам из темы
    collection_id - id коллекции
    offset - первый индекс в массиве документов карусели
    limit - последний индекс в массиве документов карусели
    т.е limit - offset задаёт число документов, который должен вернуть запрос
    """

    url = "https://frontend.vh.yandex.ru/v23/collection"

    headers = {
        'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/70.0.3538.77 Safari/537.36",
        'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        'Cache-Control': "no-cache",
        'Postman-Token': "760ccf00-c7ef-4605-a562-c2b473828466,c87521be-e721-405b-9011-db16339ae1da",
        'Host': "frontend.vh.yandex.ru",
        'Accept-Encoding': "gzip, deflate",
        'Cookie': "i=RSTWQy9tlVh7GjD3BqtSH8LH/BCv2wI2Sv8715EXO8hUnQfE9W8z4oEf0iCoO/pavI8gKf8kN/mhKua6C3KtCRFPfmk=",
        'cache-control': "no-cache"
    }

    @classmethod
    def get_response(cls, collection_id, offset, limit):

        params = dict()
        params.update({"collection_id": f"{collection_id}",
                       "offset": f"{offset}",
                       "limit": f"{limit}"})

        response = requests.request("GET", cls.url, headers=cls.headers, params=params)
        return CollectionData(response)


class CollectionData:
    def __init__(self, response):
        self.resp = response
        self.response_data = CollectionData.parse_json(response)
        self.documents = dict()

    @staticmethod
    def parse_json(response):
        try:
            data = response.json()
        except JSONDecodeError as e:
            collection_logger.debug(type(e), ',', e)
            return {}
        return data

    def _extract_documents_from_response(self):
        if not self.response_data:
            return {}

        for document in self.response_data['set']:
            try:
                content_id = document['content_id']
            except KeyError as e:
                collection_logger.debug(type(e), ',', e)
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
    cr_id = 'ChJoaGNjdmhibHJ1anpsbGtiaGgSF3Nwb3J0X2hvY2tleV9sZWFndWVfbmhsGhdzcG9ydF9ob2NrZXlfdGVhbV84MDgwNyAB'
    cr = CollectionRequest.get_response(cr_id, offset=24, limit=24)
    print(cr.resp)
    pprint(cr.get_documents())
    print(cr.get_cache_hash())
