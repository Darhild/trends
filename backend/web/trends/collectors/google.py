import logging

import requests

from trends.collectors.base import BaseCollector

REQUEST_INTERVAL = 15
REQUEST_JITTER = 1


class GoogleCollector(BaseCollector):
    def __init__(self, repo, url):
        logging.getLogger(__name__).info(
            "google collector link {0} interval {1} jitter {2}".format(
                url, REQUEST_INTERVAL, REQUEST_JITTER
            )
        )
        super().__init__(repo, REQUEST_INTERVAL, REQUEST_JITTER)
        self.source_link = url

    def collect(self):
        logging.getLogger(__name__).info("google collect")
        try:
            # print("google collect url {0}".format(self.source_link))
            response = requests.get(self.source_link)

            if response.status_code == 200:
                return self.insert_trend(response.content)

            if response.status_code == 202:
                # Do nothing
                return
            else:
                raise Exception(
                    "efir returned status code: {0}".format(response.status_code)
                )

        except Exception as e:
            logging.getLogger(__name__).error(
                "failed to collect google {0}".format(str(e))
            )
