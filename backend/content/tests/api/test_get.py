from unittest.mock import patch
from flask import url_for
import json


@patch('comment_trends.handlers.comment_trends.get_trends_cached')
def test_get_trends_mock_cache_good(mock_get, client, trends_json):
    mock_get.return_value = trends_json
    resp = client.get(url_for('comment_trends.import_trends'))
    print(resp.data)
    assert resp.status_code == 200
    assert json.loads(resp.data) == json.loads(trends_json)
