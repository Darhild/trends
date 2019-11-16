from collections import defaultdict, namedtuple
from datetime import datetime, timedelta
from typing import Dict, List, Tuple
import json
import time
# TODO первая картинка в теме / обрезать постер / яндекс апи
# по видео показывать последние видео / наиболее комментируемые
# возможно проксировать collection

from flask_caching import Cache

from comment_trends.external_api.player import PlayerRequest
from comment_trends.external_api.comments import CommentsRequest
from comment_trends.external_api.carousels import CarouselsRequest
from comment_trends.external_api.carousel import CarouselRequest
from comment_trends.external_api.theme import ThemeRequest

Counts = namedtuple('Counts', ['day', 'week', 'month'])
cache = Cache(config={'CACHE_TYPE': 'simple', "CACHE_DEFAULT_TIMEOUT": 0})

# TODO вынести в конфиг
config = {'offset': 0, 'limit': 2, 'num_docs': 2}
tags = {"movie", "series", "kids", "sport", "blogger", "common"}


def get_trends_cached():
    return cache.get('data')


def compute_trends():
    data = {}
    for tag in tags:
        result = get_sorted_trends(tag)
        data[f'{tag}'] = result

    cache.set('data', json.dumps(data, ensure_ascii=False))


def get_sorted_trends(tag):
    themes, docs = get_potential_trends(tag, config)
    sorted_themes = sorted(themes.items(), key=lambda x: x[1].day, reverse=True)
    theme_result = []
    # TODO добавить поле video_count по release date
    # get_sorted_themes
    for (theme_id, theme_title), counts in sorted_themes:
        theme_info = get_theme_info(theme_id)
        theme_result.append({
            'id': theme_id,
            'title': theme_title,
            'day': counts.day,
            'avatar': theme_info['avatar'],
            'bg': theme_info['bg'],
            'description': theme_info['description']

        })

    # get_sorted_documents
    # docs_result = []
    # sorted_docs = sorted(docs[0].items(), key=lambda x: x[1], reverse=True)
    # for doc_id, doc_count in sorted_docs:
    #     docs_result.append({'id': doc_id,
    #                         'data': docs[1][doc_id]})

    return theme_result


def get_potential_trends(tag, feed_params):

    documents = dict()
    carousels = CarouselsRequest.get_response(tag=tag, **feed_params).get_carousels()
    for carousel_id in carousels:
        new_documents, feed_params['cache_hash'] = get_documents_from_carousel(carousel_id, feed_params)
        documents.update(new_documents)

    doc_to_comments = get_comments(documents)
    theme_to_comments = group_comments_by_themes(documents, doc_to_comments)
    theme_to_count = count_comments_by_themes(theme_to_comments)

    # TODO count_comments_by_documents

    doc_to_count = {doc_id: len(doc_to_comments[doc_id]) for doc_id in doc_to_comments}
    doc_data = documents, doc_to_count
    return theme_to_count, doc_data


def get_documents_from_carousel(carousel_id, feed_params):
    response = CarouselRequest.get_response(carousel_id, offset=0, limit=feed_params['num_docs'])
    return response.get_documents(), response.get_cache_hash()


def get_comments(documents):
    # TODO получить текст топового комментария
    doc_to_comments = dict()
    for doc_id in documents:
        response = CommentsRequest.get_response(doc_id)
        doc_to_comments[doc_id] = response.get_timestamps()
    return doc_to_comments


def group_comments_by_themes(documents, doc_to_comments) -> Dict[Tuple[str, str], List]:
    themes_to_comments = defaultdict(list)

    for doc_id in documents:
        response = PlayerRequest.get_response(doc_id)
        themes = response.get_themes()

        for theme in themes:
            themes_to_comments[(theme['id'], theme['title'])].extend(doc_to_comments[doc_id])

    return themes_to_comments


def count_comments_by_themes(theme_to_comments):
    theme_to_count = dict()

    for theme_id in theme_to_comments:
        # theme_id ~ (theme_id, theme_title)
        theme_to_comments[theme_id] = [int((str(ts)[:-6])) for ts in theme_to_comments[theme_id]]
        theme_to_count[theme_id] = count_comments(theme_to_comments[theme_id])

    return theme_to_count


def count_comments(comments):
    comments.sort(reverse=True)
    today = datetime.today()
    day = count_comments_from(comments, today - timedelta(days=1))
    week = count_comments_from(comments, today - timedelta(days=7))
    month = count_comments_from(comments, today - timedelta(days=30))

    return Counts(day=day, week=week, month=month)


def count_comments_from(comment_ts, start):
    start = start.timestamp()
    count = 0
    for timestamp in comment_ts:
        if timestamp > start:
            count += 1
        else:
            break

    return count


def get_theme_info(theme_id):
    response = ThemeRequest.get_response(theme_id)
    return response.get_info()


if __name__ == '__main__':
    t1 = time.time()
    for t in tags:
        print(t, get_sorted_trends(t)[:10])
    # print(get_sorted_trends('movie')[:10])
    print(time.time() - t1)

