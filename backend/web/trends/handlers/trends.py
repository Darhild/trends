import logging

from flask import Blueprint, request, Response, abort, json, current_app

from trends.models.trends_repo import Repository
from trends.utils.feed_request import FeedRequest
from trends.utils.get_db_environ import get_environ_or_default
from trends.utils.trend_request import handle_trends_request

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
            resp = sort_and_limit(repo.read_content(period, tag), num_docs)
            shuffle(resp)

        elif source == "google":
            resp = sort_and_limit(repo.read_trend(period), num_docs)
            shuffle(resp)

        else:
            ratio_factor = 5
            if num_docs < 20:
                external_ratio = 3
                internal_ratio = 1
            else:
                external_ratio = num_docs // ratio_factor
                internal_ratio = num_docs - external_ratio

            efir_trends = sort(repo.read_trend(period))
            google_trends = sort(repo.read_content(period, tag))
            resp = merge(efir_trends, google_trends, internal_ratio, external_ratio, num_docs)
            shuffle(resp)

        return Response(response=json.dumps(resp, ensure_ascii=False),
                        status=200, mimetype='application/json')

    except Exception as e:
        abort(500, str(e))  # не очень секьюрно


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
