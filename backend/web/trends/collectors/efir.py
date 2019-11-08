import logging
<<<<<<< HEAD
import requests
=======

from flask_caching import Cache
>>>>>>> Adding repo and collectors

from trends.collectors.base import BaseCollector

REQUEST_INTERVAL = 1
REQUEST_JITTER = 1


class EfirCollector(BaseCollector):
    def __init__(self, repo, url):
<<<<<<< HEAD
        logging.info("google collector link {0} interval {1} jitter {2}".
                     format(url, REQUEST_INTERVAL, REQUEST_JITTER))
        super().__init__(repo, "google", REQUEST_INTERVAL, REQUEST_JITTER)
=======
        super().__init__(repo, "efir", REQUEST_INTERVAL, REQUEST_JITTER)
        self.cache = Cache(config={'CACHE_TYPE': 'simple', "CACHE_DEFAULT_TIMEOUT": 0})
>>>>>>> Adding repo and collectors
        self.source_link = url

    def collect(self):
        logging.info("efir collect")
<<<<<<< HEAD
        try:
            response = requests.get(self.source_link)
            print("efir collect response {0}".format(response.content))
            return self.insert(response.content)
        except Exception as e:
            logging.error("failed to collect efir {0}".format(str(e)))
=======
>>>>>>> Adding repo and collectors
