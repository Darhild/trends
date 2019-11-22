import logging
import json
import requests

from trends.collectors.base import BaseCollector

REQUEST_INTERVAL = 1
REQUEST_JITTER = 1


class VideosCollector(BaseCollector):
    def __init__(self, repo, url):
        super().__init__(repo, REQUEST_INTERVAL, REQUEST_JITTER)
        self.source_link = url

    def collect(self):
        logging.getLogger(__name__).info("videos collect")

        try:
            # print("videos collect url {0}".format(self.source_link))
            with open('mock_videos.json') as f:
                resp = json.load(f)
            return self.insert_videos(resp)
            # if response.status_code == 200:
            #     return self.insert_content(response.content)
            #
            # if response.status_code == 202:
            #     # Do nothing
            #     return
            # else:
            #     raise Exception("videos returned status code: {0}".format(response.status_code))

        except Exception as e:
            logging.getLogger(__name__).\
                error("failed to collect videos {0}".format(str(e)))

