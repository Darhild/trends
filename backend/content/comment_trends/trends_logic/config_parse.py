import logging
import os
import yaml

config_logger = logging.getLogger(__name__)

CURRENT_DIR = os.path.dirname(__file__)


class Config:
    def __init__(self, path=os.path.join(CURRENT_DIR, 'trends_config.yaml')):
        self.path = path
        self.fields = ('docs_per_carousel_num', 'carousels_num', 'request_interval_minutes', 'tags')
        self.config = self.read_config()

    def read_config(self):
        config = {}
        try:
            with open(self.path, 'rt') as f:
                config = yaml.safe_load(f.read())
        except FileNotFoundError:
            config_logger.warning('Config not found in %s', self.path)

        for f in self.fields:
            if f not in config:
                config_logger.warning('Поле %s не найдено в конфиге, '
                                      'будет использовано значение по умолчанию', f)

        return config

    def get_tags(self):
        if not self.config:
            return {'movie', 'series', 'common'}

        return set(self.config['tags'])

    def get_api_config(self):
        config = dict()
        config['offset'] = 0
        config['num_docs'] = 20
        config['limit'] = 10

        try:
            config['num_docs'] = self.config['docs_per_carousel_num']
            config['limit'] = self.config['carousels_num']
        except KeyError:
            pass

        return config

    def get_interval(self):
        interval = 30

        try:
            interval = self.config['request_interval_minutes']
        except KeyError:
            pass

        return interval
