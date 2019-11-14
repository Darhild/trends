from flask import Blueprint, request, Response, abort, json, current_app
from trends.utils.get_db_environ import get_environ_or_default
from trends.utils.feed_request import FeedRequest
from trends.utils.trend_request import handle_trends_request

from trends.models.trends_repo import Repository

import logging

trends = Blueprint('trends', __name__)
db_url = get_environ_or_default('DATABASE_URL', 'postgresql://me:hackme@0.0.0.0/trends')
mock_json = '''{
"trends": [
    {
        "id":"ChJoaGNjdmhibHJ1anpsbGtiaGgSF3Nwb3J0X2hvY2tleV9sZWFndWVfbmhsGhdzcG9ydF9ob2NrZXlfdGVhbV84MDgwNyAB",
        "title":"Какой то заголовок",
        "avatar":"https://yastatic.net/s3/home/stream/nhl/2019/avatars/teams/ava_DET.png",
        "description":"",
        "bg":"https://yastatic.net/s3/home/stream/nhl/2019/background/teams/cover_DET.png",
        "source": "efir"
    },
    {
        "id":"ChJoaGNjdmhibHJ1anpsbGtiaGgSF3Nwb3J0X2hvY2tleV9sZWFndWVfbmhsGhdzcG9ydF9ob2NrZXlfdGVhbV84MDgwNyAB",
        "title":"Еще какой то заголовок",
        "avatar":"https://yastatic.net/s3/home/stream/nhl/2019/avatars/teams/ava_DET.png",
        "description":"",
        "bg":"https://yastatic.net/s3/home/stream/nhl/2019/background/teams/cover_DET.png",
        "source": "efir"
    },
],
"length": 2
}'''


def sort_and_limit(result, limit):
    result_data = []

    if result is None or len(result) == 0:
        return result_data
    # Сортируем по day
    result = sorted(result, key=lambda x: x["day"], reverse=True)

    # Лимитируем по limit
    result = result[:limit]

    # Выбираем только "data"
    for r in result:
        result_data.append(r["data"])

    return result_data


@trends.route('/trends', methods=['GET'])
def trends_handler():
    tag, num_docs, period, source = handle_trends_request(request)

    try:
        logging.getLogger(__name__).info("New request, tag:{0}, num_docs:{1}, period:{2}, source:{3}".
                                         format(tag, num_docs, period, source))

        repo = Repository(current_app.db)
        if source == "efir":
            resp = sort_and_limit(repo.read_content(period, tag), num_docs)

        elif source == "google":
            resp = sort_and_limit(repo.read_trend(period), num_docs)

        else:
            ratio_factor = 5
            external_ratio = num_docs // ratio_factor
            internal_ratio = num_docs - external_ratio

            resp = sort_and_limit(repo.read_trend(period), external_ratio)
            resp.extend(sort_and_limit(repo.read_content(period, tag), internal_ratio))

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
