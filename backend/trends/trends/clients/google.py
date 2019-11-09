import json
import logging
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from trends.clients.prefs import RealTrendReq, cache
GOOGLE_REQUEST_INTERVAL = 15
GOOGLE_REQUEST_JITTER = 120


def make_json_response():
    """
    Get response from google, make json of it
    :return: trends list  from google as json
    """
    trend_getter = RealTrendReq()
    today_searches_df = trend_getter.today_searches_fine(pn='RU')
    response = json.dumps(
        {'data': today_searches_df},
        ensure_ascii=False)
    return response


def get_trends(cache_=None):
    """
    Gets trends from google-trend, makes json, an put then to cache
    """
    # TODO: resolve problems with logging from another thread
    logger = logging.getLogger(__name__)
    logging.basicConfig()
    logging.getLogger('apscheduler').setLevel(logging.DEBUG)
    try:
        response = make_json_response()
        logger.debug("Got trends %s", response)
        cache_.set('trends', response)
    except Exception as e:
        logging.error("Can't get trends from google due to %s", e)
        raise


def start_get_trends():
    """
    Start sending requests to google trends
    """
    scheduler = BackgroundScheduler()
    job = scheduler.add_job(get_trends,
                            trigger='interval',
                            next_run_time=datetime.now(),
                            minutes=GOOGLE_REQUEST_INTERVAL,
                            jitter=GOOGLE_REQUEST_JITTER,
                            kwargs={"cache_": cache}
                            )
    scheduler.start()


def get_trends_cached(cache_):
    """
        get treads json from cache
        returns None if there are no key 'trends' in cache
    """
    return cache_.get('trends')
