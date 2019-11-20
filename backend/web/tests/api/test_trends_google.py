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

#
# def test_trends_handler_week_for_google_empty_tag(client, google_data_week):
#     google_empty_tag(client=client, period=7,  google_data=google_data_week)
#
#
# def test_trends_handler_month_for_efir_empty_tag(client, google_data_month):
#     google_empty_tag(client=client, period=30,  google_data=google_data_month)