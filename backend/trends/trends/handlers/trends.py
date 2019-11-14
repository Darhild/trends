import logging

from flask import Blueprint, Response, request
from trends.clients.google import get_trends_cached
from trends.clients.prefs import cache

trends = Blueprint('trends', __name__)


@trends.route('/fetch', methods=['GET'])
def import_trends():
    """
    Get json with google trends from cache and returns it
    :return: flask. Response with google trends as json,
    if cache is empty returns 400 status
    """
    logger = logging.getLogger(__name__)
    logger.debug("Handler %s was triggered", request.path)
    json = get_trends_cached(cache)
    if json is not None:
        response = Response(response=json, status=200, mimetype="application/json")
    else:
        response = Response(response="Cache is empty", status=400)
    logger.debug("Send to user %s", response)
    return response
