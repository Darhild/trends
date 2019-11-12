from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler


class BaseCollector:
    def __init__(self, repo, request_interval, request_jitter):
        self.repo = repo

        self.need_stop = False
        self.interval = request_interval
        self.jitter = request_jitter

    def insert_trend(self, json):
        return self.repo.insert_trend(json)

    def insert_content(self, json):
        return self.repo.insert_content(json)

    def start(self):
        scheduler = BackgroundScheduler()
        scheduler.add_job(self.collect,
                          trigger='interval',
                          next_run_time=datetime.now(),
                          minutes=self.interval,
                          jitter=self.jitter,
                          )
        scheduler.start()

    def stop(self):
        self.need_stop = True

    def collect(self):
        raise NotImplemented
