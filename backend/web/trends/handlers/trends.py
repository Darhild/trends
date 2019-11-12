from flask import Blueprint, request, Response, abort, json
from trends.utils.get_db_environ import get_environ_or_default
from trends.utils.feed_request import FeedRequest
from trends.utils.trend_request import handle_trends_request

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


# заглушки функций читающих БД.
def get_google_trends(tag=None, num_docs=20, period=1):
    return "google"


def get_efir_trends(tag=None, num_docs=20, period=1):
    print("Get efir trends")
    return "efir"


def get_mixed_trends(tag=None, num_docs=20, period=1):
    print("Get mixed trends")
    return "mixed"


@trends.route('/trends', methods=['GET'])
def trends_handler():
    tag, num_docs, period, source = \
        handle_trends_request(request)

    switch = {'google': get_google_trends, 'efir': get_efir_trends, 'all': get_mixed_trends}
    try:
        resp = switch[source]()
        response = Response(response=resp, status=200)
    except Exception as e:
        abort(500, str(e))  # не очень секьюрно
    return response


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
