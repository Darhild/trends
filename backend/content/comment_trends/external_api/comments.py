import requests
import logging
from pprint import pprint
from comment_trends.external_api.json_parse import parse_json

comments_logger = logging.getLogger(__name__)
comments_logger.exc_info = False


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
        self.response_data = parse_json(response, logger=comments_logger)

    def _get_top_comment_ts(self):
        try:
            ts = self.response_data['tree']['0']['children']['visible']
            return ts
        except (TypeError, KeyError):
            return []

    def get_timestamps(self):
        try:
            timestamps = self.response_data['tree']['0']['children']['after']
        except (TypeError, KeyError) as e:
            comments_logger.debug("%s %s", type(e), e)
            return []

        timestamps.extend(self._get_top_comment_ts())

        return timestamps

    def get_top_comment_text(self):
        ts = self._get_top_comment_ts()
        comment = ''
        if not ts:
            return comment

        try:
            comment = self.response_data['tree'][str(ts[0])]['text']
        except (TypeError, KeyError) as e:
            comments_logger.debug("getting comment text %s %s", type(e), e)

        return comment


if __name__ == '__main__':
    result = CommentsRequest.get_response("4c453ab6e3dc88e3a4c36063f35c7b2d")
    pprint(result.response_data)
    print(result.get_timestamps())
    print(result.get_top_comment_text())
