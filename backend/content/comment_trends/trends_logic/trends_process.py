from comment_trends.trends_logic.trends import compute_trends
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime

REQUEST_INTERVAL = 120
REQUEST_JITTER = 300


def start_get_trends():
    """
    Start sending requests to external api
    """
    scheduler = BackgroundScheduler()
    scheduler.add_job(compute_trends,
                      trigger='interval',
                      next_run_time=datetime.now(),
                      minutes=REQUEST_INTERVAL,
                      jitter=REQUEST_JITTER,
                      )
    scheduler.start()
