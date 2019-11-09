import pytest
from flask import url_for

from trends.utils.feed_request import FeedRequest


def test_feed_request():
    params = {
        "offset": 0,
        "limit": 20,
        "tag": 'blogger'
    }
    fr = FeedRequest()
    resp = fr.get_response(**params)
    assert resp.status_code == 200
    return resp


def test_feed_proxy(client):
    data = {
        "offset": 0,
        "limit": 20,
        "tag": 'blogger'
    }
    resp = client.get(
        url_for('trends.feed_proxy', **data),
    )
    assert resp.status_code == 200

    results = resp.json['data']
    assert len(results) == len(test_feed_request().json())
    # assert results['items'] == test_feed_request().json()['items'] # не могу
    # проверить, т.к. поля постоянно меняю свою очередность


@pytest.mark.parametrize(
    ('data', 'status'), [
        ({"offset": "0", "limit": "20", "tag": 'bla-bla', }, 200),  # nonexistent tag
        ({"limit": "20", "tag": 'blogger', }, 200),  # not offset
        ({"offset": "0", "tag": 'blogger', }, 200),  # not limit
        ({"offset": "0", "limit": "20", }, 200),  # not tag
        ({"offset": "1256985555", "limit": "20", "tag": 'blogger', }, 200),
    ]
)
def test_feed_proxy_bad_request(client, data, status):
    resp = client.get(
        url_for('trends.feed_proxy', **data),
    )
    assert resp.status_code == status
