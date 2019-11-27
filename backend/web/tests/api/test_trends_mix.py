from operator import itemgetter

import pytest
from flask import url_for

TAGS_FOR_EFIR = [
    ("blogger",),
    ("sport",),
    ("movie",),
    ("kids",),
    ("series",),
    ("common",),
]


def mix_with_tag(client, period, tag, mix_data):
    params = {
        "num_docs": 20,
        "period": period,
        "tag": tag,
    }
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == len(mix_data[tag])

    for got, expected in zip(
        sorted(response.json, key=itemgetter("title")),
        sorted(mix_data[tag], key=itemgetter("title")),
    ):
        assert got == expected


def mix_empty_tag(client, period, mix_data):
    params = {
        "num_docs": 20,
        "period": period,
    }
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    # assert len(response.json) == len(mix_data)

    for got, expected in zip(
        sorted(response.json, key=itemgetter("title")),
        sorted(mix_data, key=itemgetter("title")),
    ):
        assert got == expected


def mix_unknown_tag(client, period):
    params = {"num_docs": 20, "period": period, "source": "efir", "tag": "unknown"}
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert response.json == []


def mix_shuffle_data(client, period, mix_data):
    params = {
        "num_docs": 20,
        "period": period,
    }
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == len(mix_data)

    if len(response.json) == 1:
        assert response.json == mix_data
    else:
        assert response.json != mix_data


def mix_with_empty_db(client, period):
    params = {
        "num_docs": 20,
        "period": period,
    }
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == 0

    assert response.json == []


def mix_various_num_docs(client, period, num_docs, mix_data):
    params = {
        "num_docs": num_docs,
        "period": period,
    }
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert 0 < len(response.json) <= num_docs


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_today_for_mix(client, tag, efir_data_today):
    mix_with_tag(client=client, period=1, tag=tag, mix_data=efir_data_today)


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_week_for_mix(client, tag, efir_data_week):
    mix_with_tag(client=client, period=7, tag=tag, mix_data=efir_data_week)


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_month_for_mix(client, tag, efir_data_month):
    mix_with_tag(client=client, period=30, tag=tag, mix_data=efir_data_month)


def test_trends_handler_today_for_mix_empty_tag(client, mix_data_today):
    mix_empty_tag(client=client, period=1, mix_data=mix_data_today)


def test_trends_handler_week_for_mix_empty_tag(client, mix_data_week):
    mix_empty_tag(client=client, period=7, mix_data=mix_data_week)


def test_trends_handler_month_for_mix_empty_tag(client, mix_data_month):
    mix_empty_tag(client=client, period=30, mix_data=mix_data_month)


def test_trends_handler_today_for_mix_unknown_tag(client):
    mix_unknown_tag(client=client, period=1)


def test_trends_handler_week_for_mix_unknown_tag(client):
    mix_unknown_tag(client=client, period=7)


def test_trends_handler_month_for_mix_unknown_tag(client):
    mix_unknown_tag(client=client, period=30)


def test_trends_handler_today_for_mix_shuffle(client, mix_data_today):
    mix_shuffle_data(client=client, period=1, mix_data=mix_data_today)


def test_trends_handler_week_for_mix_shuffle(client, mix_data_week):
    mix_shuffle_data(client=client, period=7, mix_data=mix_data_week)


def test_trends_handler_month_for_mix_shuffle(client, mix_data_month):
    mix_shuffle_data(client=client, period=30, mix_data=mix_data_month)


def test_trends_handler_today_for_mix_empty_db(clear_mix_table_in_db, client):
    mix_with_empty_db(client=client, period=1)


def test_trends_handler_week_for_mix_empty_db(clear_mix_table_in_db, client):
    mix_with_empty_db(client=client, period=7)


def test_trends_handler_month_for_mix_empty_db(clear_mix_table_in_db, client):
    mix_with_empty_db(client=client, period=30)


@pytest.mark.parametrize(("num_docs",), [(1,), (4,), (10,), (17,), (21,),])
def test_trends_handler_today_for_mix_various_num_docs(
    client, num_docs, mix_data_today
):
    mix_various_num_docs(
        client=client, period=1, num_docs=num_docs, mix_data=mix_data_today
    )


@pytest.mark.parametrize(("num_docs",), [(1,), (4,), (10,), (17,), (21,),])
def test_trends_handler_week_for_mix_various_num_docs(client, num_docs, mix_data_week):
    mix_various_num_docs(
        client=client, period=7, num_docs=num_docs, mix_data=mix_data_week
    )


@pytest.mark.parametrize(("num_docs",), [(1,), (4,), (10,), (17,), (21,),])
def test_trends_handler_month_for_mix_various_num_docs(
    client, num_docs, mix_data_month
):
    mix_various_num_docs(
        client=client, period=30, num_docs=num_docs, mix_data=mix_data_month
    )
