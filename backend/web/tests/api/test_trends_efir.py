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


def efir_with_tag(client, period, tag, efir_data):
    params = {
        "num_docs": 20,
        "period": period,
        "tag": tag,
        "source": "efir",
    }
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == len(efir_data[tag])

    for got, expected in zip(
        sorted(response.json, key=itemgetter("title")),
        sorted(efir_data[tag], key=itemgetter("title")),
    ):
        assert got == expected


def efir_empty_tag(client, period, efir_data):
    params = {
        "num_docs": 20,
        "period": period,
        "source": "efir",
    }
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == len(efir_data["common"])

    for got, expected in zip(
        sorted(response.json, key=itemgetter("title")),
        sorted(efir_data["common"], key=itemgetter("title")),
    ):
        assert got == expected


def efir_unknown_tag(client, period):
    params = {"num_docs": 20, "period": period, "source": "efir", "tag": "unknown"}
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert response.json == []


def efir_not_shuffle_data(client, tag, period, efir_data):
    params = {
        "num_docs": 20,
        "period": period,
        "source": "efir",
        "tag": tag,
    }
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == len(efir_data[tag])

    assert response.json == efir_data[tag]


def efir_with_empty_db(tag, period, client):
    params = {
        "num_docs": 20,
        "period": period,
        "source": "efir",
        "tag": tag,
    }
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == 0

    assert response.json == []


def efir_various_num_docs(client, period, num_docs, efir_data):

    params = {
        "num_docs": num_docs,
        "period": period,
        "source": "efir",
    }
    response = client.get(url_for("trends.trends_handler", **params),)
    assert response.status_code == 200

    assert 0 < len(response.json) <= num_docs


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_today_for_efir(client, tag, efir_data_today):
    efir_with_tag(client=client, period=1, tag=tag, efir_data=efir_data_today)


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_week_for_efir(client, tag, efir_data_week):
    efir_with_tag(client=client, period=7, tag=tag, efir_data=efir_data_week)


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_month_for_efir(client, tag, efir_data_month):
    efir_with_tag(client=client, period=30, tag=tag, efir_data=efir_data_month)


def test_trends_handler_today_for_efir_empty_tag(client, efir_data_today):
    efir_empty_tag(client=client, period=1, efir_data=efir_data_today)


def test_trends_handler_week_for_efir_empty_tag(client, efir_data_week):
    efir_empty_tag(client=client, period=7, efir_data=efir_data_week)


def test_trends_handler_month_for_efir_empty_tag(client, efir_data_month):
    efir_empty_tag(client=client, period=30, efir_data=efir_data_month)


def test_trends_handler_today_for_efir_unknown_tag(client):
    efir_unknown_tag(client=client, period=1)


def test_trends_handler_week_for_efir_unknown_tag(client):
    efir_unknown_tag(client=client, period=7)


def test_trends_handler_month_for_efir_unknown_tag(client):
    efir_unknown_tag(client=client, period=30)


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_today_for_efir_shuffle(client, tag, efir_data_today):
    efir_not_shuffle_data(client=client, period=1, tag=tag, efir_data=efir_data_today)


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_week_for_efir_shuffle(client, tag, efir_data_week):
    efir_not_shuffle_data(client=client, period=7, tag=tag, efir_data=efir_data_week)


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_month_for_efir_shuffle(client, tag, efir_data_month):
    efir_not_shuffle_data(client=client, period=30, tag=tag, efir_data=efir_data_month)


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_today_for_efir_empty_db(clear_efir_table_in_db, client, tag):
    efir_with_empty_db(client=client, period=1, tag=tag)


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_week_for_efir_empty_db(clear_efir_table_in_db, client, tag):
    efir_with_empty_db(client=client, period=7, tag=tag)


@pytest.mark.parametrize(("tag",), TAGS_FOR_EFIR)
def test_trends_handler_month_for_efir_empty_db(clear_efir_table_in_db, client, tag):
    efir_with_empty_db(client=client, period=30, tag=tag)


@pytest.mark.parametrize(("num_docs",), [(1,), (4,), (10,), (17,), (21,),])
def test_trends_handler_today_for_efir_various_num_docs(
    client, num_docs, efir_data_today
):
    efir_various_num_docs(
        client=client, period=1, num_docs=num_docs, efir_data=efir_data_today
    )


@pytest.mark.parametrize(("num_docs",), [(1,), (4,), (10,), (17,), (21,),])
def test_trends_handler_week_for_efir_various_num_docs(
    client, num_docs, efir_data_week
):
    efir_various_num_docs(
        client=client, period=7, num_docs=num_docs, efir_data=efir_data_week
    )


@pytest.mark.parametrize(("num_docs",), [(1,), (4,), (10,), (17,), (21,),])
def test_trends_handler_month_for_efir_various_num_docs(
    client, num_docs, efir_data_month
):
    efir_various_num_docs(
        client=client, period=30, num_docs=num_docs, efir_data=efir_data_month
    )
