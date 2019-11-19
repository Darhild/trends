import pytest

from flask import url_for


# TODO: вставить еще tag
@pytest.mark.parametrize(
    ("tag", ), [
        ("blogger", ),
        ("sport", ),
        ("movie", ),
        ("kids", ),
        ("series", ),
    ]
)
def test_trends_handler_today_for_efir(client, tag, efir_data_today):
    params = {
        "num_docs": 20,
        "period": 1,
        "tag": tag,
        "source": "efir",
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200

    assert response.json == efir_data_today[tag]


def test_trends_handler_today_empty_tag(client, efir_data_today):
    params = {
        "num_docs": 20,
        "period": 1,
        "source": "efir",
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200

    assert response.json == efir_data_today["common"]


def test_trends_handler_today_any_tag(client):
    params = {
        "num_docs": 20,
        "period": 1,
        "source": "efir",
        "tag": "something strange"
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200

    assert response.json == []


# TODO: вставить еще tag
@pytest.mark.parametrize(
    ("tag", ), [
        ("blogger", ),
        ("sport", ),
        ("movie", ),
        ("kids", ),
        ("series",),
    ]
)
def test_trends_handler_week_for_efir(client, tag, efir_data_week):
    params = {
        "num_docs": 20,
        "period": 7,
        "tag": tag,
        "source": "efir",
    }
    response = client.get(
        url_for('trends.trends_handler', **params),
    )
    assert response.status_code == 200
    for i in sorted(response.json, key='title'):

        print(i)
    assert len(response.json) == len(efir_data_week[tag])
    # assert len(response.json) == len(efir_data_week[tag])


# def test_trends_handler_week_empty_tag(client, efir_data_week):
#     params = {
#         "num_docs": 20,
#         "period": 1,
#         "source": "efir",
#     }
#     response = client.get(
#         url_for('trends.trends_handler', **params),
#     )
#     assert response.status_code == 200
#
#     assert response.json == efir_data_week["common"]
#
#
# def test_trends_handler_week_any_tag(client):
#     params = {
#         "num_docs": 20,
#         "period": 1,
#         "source": "efir",
#         "tag": "something strange"
#     }
#     response = client.get(
#         url_for('trends.trends_handler', **params),
#     )
#     assert response.status_code == 200
#
#     assert response.json == []
