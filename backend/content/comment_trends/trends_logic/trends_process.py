from comment_trends.trends_logic.trends import compute_trends, trends_config
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime

REQUEST_JITTER = 20


def start_get_trends():
    """
    Start sending requests to external api
    """
    scheduler = BackgroundScheduler()
    scheduler.add_job(compute_trends,
                      trigger='interval',
                      next_run_time=datetime.now(),
                      minutes=trends_config.get_interval(),
                      jitter=REQUEST_JITTER,
                      )
    scheduler.start()
