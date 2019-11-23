import logging
import os

from flask import Blueprint, request, Response, abort, json, current_app

from trends.models.trends_repo import Repository
from trends.utils.feed_request import FeedRequest
from trends.utils.collection_request import CollectionRequest
from trends.utils.get_db_environ import get_environ_or_default
from trends.utils.trend_request import handle_trends_request, handle_videos_request

from trends.handlers.trends_algs import sort, sort_and_limit, merge
from random import shuffle

trends = Blueprint('trends', __name__)
db_url = get_environ_or_default('DATABASE_URL', 'postgresql://me:hackme@0.0.0.0/trends')


@trends.route('/api/trends', methods=['GET'])
def trends_handler():
    tag, num_docs, period, source = handle_trends_request(request)

    try:
        logging.getLogger(__name__).info("New request, tag:{0}, num_docs:{1}, period:{2}, source:{3}".
                                         format(tag, num_docs, period, source))

        repo = Repository(current_app.db)
        if source == "efir":
            if tag is None:
                resp = sort_and_limit(repo.read_content(period, "common"), num_docs)
            else:
                resp = sort_and_limit(repo.read_content(period, tag), num_docs)

        elif source == "google":
            if tag is None:
                resp = sort_and_limit(repo.read_trend(period), num_docs)
            else:
                return Response(response=json.dumps("Google do not have tags", ensure_ascii=False),
                                status=400, mimetype='application/json')
            shuffle(resp)
        else:
            if tag is None:
                ratio_factor = 5
                if num_docs < 20:
                    external_ratio = 3
                    internal_ratio = 1
                else:
                    external_ratio = num_docs // ratio_factor
                    internal_ratio = num_docs - external_ratio
                google_trends = [x["data"] for x in sort(repo.read_trend(period))]
                efir_trends = [x["data"] for x in sort(repo.read_content(period, "common"))]
                resp = merge(efir_trends, google_trends, internal_ratio, external_ratio, num_docs)
            else:
                resp = sort_and_limit(repo.read_content(period, tag), num_docs)
            shuffle(resp)
        return Response(response=json.dumps(resp, ensure_ascii=False),
                        status=200, mimetype='application/json')

    except Exception as e:
        abort(500, str(e))  # не очень секьюрно


@trends.route('/api/trends/videos', methods=['GET'])
def videos_handler():
    tag, num_docs, period = handle_videos_request(request)
    print(tag, num_docs, period)

    try:
        logging.getLogger(__name__).info("New request, tag:{0}, num_docs:{1}, period:{2}".
                                         format(tag, num_docs, period))

        repo = Repository(current_app.db)

        if tag is None:
            resp = sort_and_limit(repo.read_videos(period, "common"), num_docs)
        else:
            resp = sort_and_limit(repo.read_videos(period, tag), num_docs)

        return Response(response=json.dumps(resp, ensure_ascii=False),
                        status=200, mimetype='application/json')

    except Exception as e:
        abort(500, str(e))


@trends.route('/api/feed', methods=['GET'], )
def feed_proxy():
    limit = request.args.get('limit')
    tag = request.args.get('tag')
    offset = request.args.get('offset')

    # log.info('GET /api/feed?tag=%s&offset=%s&limit=%s', tag, offset, limit)
    fr = FeedRequest()
    resp = fr.get_response(tag=tag, offset=offset, limit=limit)
    return Response(
        json.dumps({"data": resp.json()}, ensure_ascii=False),
        status=resp.status_code, mimetype='application/json'
    )


@trends.route('/api/collection', methods=['GET'], )
def collection_proxy():
    limit = request.args.get('limit')

    collection_id = request.args.get('collection_id')
    offset = request.args.get('offset')

    cr = CollectionRequest()
    resp = cr.get_response(collection_id=collection_id, offset=offset, limit=limit)
    return Response(
        json.dumps({"data": resp.json()}, ensure_ascii=False),
        status=resp.status_code, mimetype='application/json'
    )
