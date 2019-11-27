from flask import Blueprint, Response

from comment_trends.trends_logic.trends import get_trends_cached


comment_trends = Blueprint("comment_trends", __name__)


@comment_trends.route("/fetch/themes", methods=["GET"])
def import_trends():

    json = get_trends_cached(field="theme_trends")
    if json is not None:
        return Response(response=json, status=200)
    else:
        return Response(response="Cache is empty", status=202)


@comment_trends.route("/fetch/videos", methods=["GET"])
def import_document_trends():

    json = get_trends_cached(field="video_trends")
    if json is not None:
        return Response(response=json, status=200)
    else:
        return Response(response="Cache is empty", status=202)
