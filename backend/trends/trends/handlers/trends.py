import logging

from flask import Blueprint, Response, request
from trends.clients.google import get_trends_cached
from trends.clients.prefs import cache

trends = Blueprint('trends', __name__)


@trends.route('/fetch', methods=['GET'])
def import_trends():
    """
    Get json with google trends from cache and returns it
    :return:
    flask.Response with status 200 and google trends in json format as payload if cache is full
    flask.Response with 202 status if cache is empty

    JSON EXAMPLE
    {
        "data":
        [
            {
            "title": "День рождения Деда Мороза",
            "avatar": "avatar_url",
            "description": "Сегодня день рождения Деда Мороза",
            "day": 10000,
            "bg": "bg_url"
            },
            {
            "title": "ФНЛ",
            "avatar": "avatar_url",
            "description": "Президент ФНЛ: туман на матче «Авангарда»? Может, это ...",
            "day": 5000,
            "bg": "bg_url"
            }
        ],
        "date": "20191126"
    }
    """
    logger = logging.getLogger(__name__)
    logger.debug("Handler %s was triggered", request.path)
    json = get_trends_cached(cache)
    if json is not None:
        response = Response(response=json, status=200, mimetype="application/json")
    else:
        response = Response(response="Cache is empty", status=202)
    logger.debug("Send to user %s", response)
    return response
