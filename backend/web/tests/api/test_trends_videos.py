from operator import itemgetter

import pytest
from flask import url_for

TAGS_FOR_VIDEOS = [
    ("blogger",),
    ("sport",),
    ("movie",),
    ("kids",),
    ("series",),
    ("common",),
]


def videos_with_tag(client, period, tag, videos_data):
    params = {
        "num_docs": 20,
        "period": period,
        "tag": tag,
    }
    response = client.get(url_for("trends.videos_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == len(videos_data[tag])

    for got, expected in zip(
        sorted(response.json, key=itemgetter("title")),
        sorted(videos_data[tag], key=itemgetter("title")),
    ):
        assert got == expected


def videos_empty_tag(client, period, videos_data):
    params = {
        "num_docs": 20,
        "period": period,
    }
    response = client.get(url_for("trends.videos_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == len(videos_data["common"])
    for got, expected in zip(
        sorted(response.json, key=itemgetter("title")),
        sorted(videos_data["common"], key=itemgetter("title")),
    ):
        assert got == expected


def videos_unknown_tag(client, period):
    params = {"num_docs": 20, "period": period, "tag": "unknown"}
    response = client.get(url_for("trends.videos_handler", **params),)
    assert response.status_code == 200

    assert response.json == []


def videos_not_shuffle_data(client, tag, period, videos_data):
    params = {
        "num_docs": 20,
        "period": period,
        "tag": tag,
    }
    response = client.get(url_for("trends.videos_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == len(videos_data[tag])

    assert response.json == videos_data[tag]


def videos_with_empty_db(tag, period, client):
    params = {
        "num_docs": 20,
        "period": period,
        "tag": tag,
    }
    response = client.get(url_for("trends.videos_handler", **params),)
    assert response.status_code == 200

    assert len(response.json) == 0

    assert response.json == []


def videos_various_num_docs(client, period, num_docs, videos_data):

    params = {
        "num_docs": num_docs,
        "period": period,
    }
    response = client.get(url_for("trends.videos_handler", **params),)
    assert response.status_code == 200

    assert 0 < len(response.json) <= num_docs


@pytest.mark.parametrize(("tag",), TAGS_FOR_VIDEOS)
def test_videos_handler_today_for_videos(client, tag, videos_data_today):
    videos_with_tag(client=client, period=1, tag=tag, videos_data=videos_data_today)


@pytest.mark.parametrize(("tag",), TAGS_FOR_VIDEOS)
def test_videos_handler_week_for_videos(client, tag, videos_data_week):
    videos_with_tag(client=client, period=7, tag=tag, videos_data=videos_data_week)


@pytest.mark.parametrize(("tag",), TAGS_FOR_VIDEOS)
def test_videos_handler_month_for_videos(client, tag, videos_data_month):
    videos_with_tag(client=client, period=30, tag=tag, videos_data=videos_data_month)


def test_videos_handler_today_for_videos_empty_tag(client, videos_data_today):
    videos_empty_tag(client=client, period=1, videos_data=videos_data_today)


def test_videos_handler_week_for_videos_empty_tag(client, videos_data_week):
    videos_empty_tag(client=client, period=7, videos_data=videos_data_week)


def test_videos_handler_month_for_videos_empty_tag(client, videos_data_month):
    videos_empty_tag(client=client, period=30, videos_data=videos_data_month)


def test_videos_handler_today_for_videos_unknown_tag(client):
    videos_unknown_tag(client=client, period=1)


def test_videos_handler_week_for_videos_unknown_tag(client):
    videos_unknown_tag(client=client, period=7)


def test_videos_handler_month_for_videos_unknown_tag(client):
    videos_unknown_tag(client=client, period=30)


@pytest.mark.parametrize(("tag",), TAGS_FOR_VIDEOS)
def test_videos_handler_today_for_videos_shuffle(client, tag, videos_data_today):
    videos_not_shuffle_data(
        client=client, period=1, tag=tag, videos_data=videos_data_today
    )


@pytest.mark.parametrize(("tag",), TAGS_FOR_VIDEOS)
def test_videos_handler_week_for_videos_shuffle(client, tag, videos_data_week):
    videos_not_shuffle_data(
        client=client, period=7, tag=tag, videos_data=videos_data_week
    )


@pytest.mark.parametrize(("tag",), TAGS_FOR_VIDEOS)
def test_videos_handler_month_for_videos_shuffle(client, tag, videos_data_month):
    videos_not_shuffle_data(
        client=client, period=30, tag=tag, videos_data=videos_data_month
    )


@pytest.mark.parametrize(("tag",), TAGS_FOR_VIDEOS)
def test_videos_handler_today_for_videos_empty_db(
    clear_videos_table_in_db, client, tag
):
    videos_with_empty_db(client=client, period=1, tag=tag)


@pytest.mark.parametrize(("tag",), TAGS_FOR_VIDEOS)
def test_videos_handler_week_for_videos_empty_db(clear_videos_table_in_db, client, tag):
    videos_with_empty_db(client=client, period=7, tag=tag)


@pytest.mark.parametrize(("tag",), TAGS_FOR_VIDEOS)
def test_videos_handler_month_for_videos_empty_db(
    clear_videos_table_in_db, client, tag
):
    videos_with_empty_db(client=client, period=30, tag=tag)


@pytest.mark.parametrize(("num_docs",), [(1,), (4,), (10,), (17,), (21,),])
def test_videos_handler_today_for_videos_various_num_docs(
    client, num_docs, videos_data_today
):
    videos_various_num_docs(
        client=client, period=1, num_docs=num_docs, videos_data=videos_data_today
    )


@pytest.mark.parametrize(("num_docs",), [(1,), (4,), (10,), (17,), (21,),])
def test_videos_handler_week_for_videos_various_num_docs(
    client, num_docs, videos_data_week
):
    videos_various_num_docs(
        client=client, period=7, num_docs=num_docs, videos_data=videos_data_week
    )


@pytest.mark.parametrize(("num_docs",), [(1,), (4,), (10,), (17,), (21,),])
def test_videos_handler_month_for_videos_various_num_docs(
    client, num_docs, videos_data_month
):
    videos_various_num_docs(
        client=client, period=30, num_docs=num_docs, videos_data=videos_data_month
    )
