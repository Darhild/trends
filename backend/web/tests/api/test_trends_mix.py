import pytest
from operator import itemgetter
from flask import url_for

# TODO: вставить еще tag
TAGS_FOR_EFIR = [
    ("blogger", ),
    ("sport", ),
    ("movie", ),
    ("kids", ),
    ("series", ),
]


def mix_with_tag(client, period, tag, mix_data):
    params = {
        "num_docs": 20,
        "period": period,
        "tag": tag,
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200

    assert len(response.json) == len(mix_data[tag])

    for got, expected in zip(
            sorted(response.json, key=itemgetter('title')),
            sorted(mix_data[tag], key=itemgetter('title'))
    ):
        assert got == expected


def mix_empty_tag(client, period, mix_data):
    params = {
        "num_docs": 20,
        "period": period,
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200

    # assert len(response.json) == len(mix_data)

    for got, expected in zip(
            sorted(response.json, key=itemgetter('title')),
            sorted(mix_data, key=itemgetter('title'))
    ):
        assert got == expected


def mix_unknown_tag(client, period):
    params = {
        "num_docs": 20,
        "period": period,
        "source": "efir",
        "tag": "unknown"
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200

    assert response.json == []


@pytest.mark.parametrize(
    ("tag", ), TAGS_FOR_EFIR
)
def test_trends_handler_today_for_mix(client, tag, efir_data_today):
    mix_with_tag(client=client, period=1, tag=tag,  mix_data=efir_data_today)


@pytest.mark.parametrize(
    ("tag", ), TAGS_FOR_EFIR
)
def test_trends_handler_week_for_mix(client, tag, efir_data_week):
    mix_with_tag(client=client, period=7, tag=tag,  mix_data=efir_data_week)


@pytest.mark.parametrize(
    ("tag", ), TAGS_FOR_EFIR
)
def test_trends_handler_month_for_mix(client, tag, efir_data_month):
    mix_with_tag(client=client, period=30, tag=tag,  mix_data=efir_data_month)


def test_trends_handler_today_for_mix_empty_tag(client, mix_data_today):
    mix_empty_tag(client=client, period=1,  mix_data=mix_data_today)


def test_trends_handler_week_for_mix_empty_tag(client, mix_data_week):
    mix_empty_tag(client=client, period=7,  mix_data=mix_data_week)


def test_trends_handler_month_for_mix_empty_tag(client, mix_data_month):
    mix_empty_tag(client=client, period=30,  mix_data=mix_data_month)


def test_trends_handler_today_for_mix_unknown_tag(client):
    mix_unknown_tag(client=client, period=1)


def test_trends_handler_week_for_mix_unknown_tag(client):
    mix_unknown_tag(client=client, period=7)


def test_trends_handler_month_for_mix_unknown_tag(client):
    mix_unknown_tag(client=client, period=30)
