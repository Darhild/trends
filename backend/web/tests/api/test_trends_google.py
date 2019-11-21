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
    ("common",),
    ("unknown", ),  # unknown tag
]


def google_with_tag(client, period, tag):
    params = {
        "num_docs": 20,
        "period": period,
        "tag": tag,
        "source": "google",
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 400


def google_empty_tag(client, period, google_data):
    params = {
        "num_docs": 20,
        "period": period,
        "source": "google",
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200

    assert len(response.json) == len(google_data)
    for got, expected in zip(
            sorted(response.json, key=itemgetter('title')),
            sorted(google_data, key=itemgetter('title'))
    ):
        assert got == expected


def google_shuffle_data(client, period, google_data):
    params = {
        "num_docs": 20,
        "period": period,
        "source": "google",
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200

    assert len(response.json) == len(google_data)

    if len(response.json) == 1:
        assert response.json == google_data
    else:
        assert response.json != google_data


def google_with_empty_db(client, period):
    params = {
        "num_docs": 20,
        "period": period,
        "source": "google",
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200

    assert len(response.json) == 0

    assert response.json == []


def google_various_num_docs(client, period, num_docs, google_data):

    params = {
        "num_docs": num_docs,
        "period": period,
        "source": "google",
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200

    assert 0 < len(response.json) <= num_docs


@pytest.mark.parametrize(
    ("tag", ), TAGS_FOR_EFIR
)
def test_trends_handler_today_for_google(client, tag):
    google_with_tag(client=client, period=1, tag=tag)


@pytest.mark.parametrize(
    ("tag", ), TAGS_FOR_EFIR
)
def test_trends_handler_week_for_google(client, tag):
    google_with_tag(client=client, period=7, tag=tag)


@pytest.mark.parametrize(
    ("tag", ), TAGS_FOR_EFIR
)
def test_trends_handler_month_for_google(client, tag):
    google_with_tag(client=client, period=30, tag=tag)


def test_trends_handler_today_for_google_empty_tag(client, google_data_today):
    google_empty_tag(client=client, period=1,  google_data=google_data_today)


def test_trends_handler_week_for_google_empty_tag(client, google_data_week):
    google_empty_tag(client=client, period=7,  google_data=google_data_week)


def test_trends_handler_month_for_google_empty_tag(client, google_data_month):
    google_empty_tag(client=client, period=30,  google_data=google_data_month)


def test_trends_handler_today_for_google_shuffle(client, google_data_today):
    google_shuffle_data(client=client, period=1,  google_data=google_data_today)


def test_trends_handler_week_for_google_shuffle(client, google_data_week):
    google_shuffle_data(client=client, period=7,  google_data=google_data_week)


def test_trends_handler_month_for_google_shuffle(client, google_data_month):
    google_shuffle_data(client=client, period=30,  google_data=google_data_month)


def test_trends_handler_today_for_google_empty_db(clear_google_table_in_db, client):
    google_with_empty_db(client=client, period=1)


def test_trends_handler_week_for_google_empty_db(clear_google_table_in_db, client):
    google_with_empty_db(client=client, period=7)


def test_trends_handler_month_for_google_empty_db(clear_google_table_in_db, client):
    google_with_empty_db(client=client, period=30)


@pytest.mark.parametrize(
    ("num_docs",), [(1,), (4,), (10,), (17,), (21,), ]
)
def test_trends_handler_today_for_google_various_num_docs(client, num_docs, google_data_today):
    google_various_num_docs(client=client, period=1, num_docs=num_docs, google_data=google_data_today)


@pytest.mark.parametrize(
    ("num_docs",), [(1,), (4,), (10,), (17,), (21,), ]
)
def test_trends_handler_week_for_google_various_num_docs(client, num_docs, google_data_week):
    google_various_num_docs(client=client, period=7, num_docs=num_docs, google_data=google_data_week)


@pytest.mark.parametrize(
    ("num_docs",), [(1,), (4,), (10,), (17,), (21,), ]
)
def test_trends_handler_month_for_google_various_num_docs(client, num_docs, google_data_month):
    google_various_num_docs(client=client, period=30, num_docs=num_docs, google_data=google_data_month)

