from flask import Blueprint, request, Response, current_app, json

trends = Blueprint('trends', __name__)

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
    # user = request.args.get('user')
    return Response(mock_json, status=200)

