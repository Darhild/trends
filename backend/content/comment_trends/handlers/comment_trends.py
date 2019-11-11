from flask import Blueprint, Response
from comment_trends.trends_logic.trends import get_trends_cached, tags

comment_trends = Blueprint('trends', __name__)


@comment_trends.route('/fetch', methods=['GET'])
def import_trends():

    json = get_trends_cached()
    if json is not None:
        return Response(response=json, status=200)
    else:
        return Response(response="Cache is empty", status=400)
