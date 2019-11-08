import logging

from flask_caching import Cache

from trends.collectors.base import BaseCollector

REQUEST_INTERVAL = 1
REQUEST_JITTER = 1


class EfirCollector(BaseCollector):
    def __init__(self, repo, url):
        super().__init__(repo, "efir", REQUEST_INTERVAL, REQUEST_JITTER)
        self.cache = Cache(config={'CACHE_TYPE': 'simple', "CACHE_DEFAULT_TIMEOUT": 0})
        self.source_link = url

    def collect(self):
        logging.info("efir collect")
