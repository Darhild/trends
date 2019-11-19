import requests
from pprint import pprint
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
        'Host': "frontend.vh.yandex.ru",
        'Accept-Encoding': "gzip, deflate",
        'cache-control': "no-cache"
    }

    @classmethod
    def get_response(cls, collection_id, offset, limit):

        params = dict()
        params.update({"collection_id": f"{collection_id}",
                       "offset": f"{offset}",
                       "limit": f"{limit}"})

        response = requests.request("GET", cls.url, headers=cls.headers, params=params)
        return response


if __name__ == '__main__':
    cr_id = 'ChJoaGNjdmhibHJ1anpsbGtiaGgSF3Nwb3J0X2hvY2tleV9sZWFndWVfbmhsGhdzcG9ydF9ob2NrZXlfdGVhbV84MDgwNyAB'
    cr = CollectionRequest.get_response(cr_id, offset=24, limit=24)
    pprint(cr.json())
