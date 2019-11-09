from flask import Blueprint, request, Response, current_app, json

from trends.utils.get_db_environ import get_environ_or_default
from trends.models.trends_repo import Repository
from trends.utils.feed_request import FeedRequest


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


@trends.route('/trends', methods=['GET'])
def trends_handler():
    data = {
        "data": list(Repository(current_app.db).read_all())
    }
    return Response(json.dumps(data), status=200)


@trends.route('/api/feed', methods=['GET'],)
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
