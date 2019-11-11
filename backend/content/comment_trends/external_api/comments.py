import requests
import logging
from json import JSONDecodeError
from pprint import pprint

comments_logger = logging.getLogger(__name__)


class CommentsRequest:
    """
    возвращается список, состоящий из timestamp всех комментариев документа
    document_id - id документа(видео)
    """
    api_key = "3a223f7e-69e6-4347-99e7-7a9aeea34053"

    url = "https://yandex.ru/comments/api/v1/tree"

    headers = {
        'x-cmnt-api-key': api_key,
        'User-Agent': "PostmanRuntime/7.19.0",
        'Accept': "*/*",
        'Cache-Control': "no-cache",
        'Host': "yandex.ru",
        'Accept-Encoding': "gzip, deflate",
        'cache-control': "no-cache"
    }

    @classmethod
    def get_response(cls, document_id):
        params = {"entityId": document_id}
        response = requests.request("GET", cls.url, headers=cls.headers,
                                    params=params)
        return CommentsData(response)


class CommentsData:
    def __init__(self, response):
        self.response = response

    def get_timestamps(self):
        try:
            data = self.response.json()
            timestamps = data['tree']['0']['children']['after']
        except (KeyError, JSONDecodeError) as e:
            comments_logger.debug(type(e), ',', e)
            return []

        try:
            other_ts = data['tree']['0']['children']['visible']
            timestamps.extend(other_ts)
        except KeyError as e:
            comments_logger.debug(type(e), ',', e)

        return timestamps


if __name__ == '__main__':
    result = CommentsRequest.get_response("4c453ab6e3dc88e3a4c36063f35c7b2d")
    pprint(result.response.json())
    print(result.get_timestamps())
