from collections import defaultdict
from datetime import datetime, timedelta
from typing import Dict, List, Tuple
import json
import time

# TODO по видео показывать последние видео / наиболее комментируемые

from flask_caching import Cache

from comment_trends.external_api.player import PlayerRequest
from comment_trends.external_api.comments import CommentsRequest
from comment_trends.external_api.carousels import CarouselsRequest
from comment_trends.external_api.carousel import CarouselRequest
from comment_trends.external_api.theme import ThemeRequest

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

    theme_trends = sort_themes(themes)

    # document_trends = sort_documents(docs)

    return theme_trends


def sort_themes(themes):
    sorted_themes = sorted(themes.items(), key=lambda x: x[1], reverse=True)
    theme_trends = []
    # TODO добавить поле video_count по release date
    # TODO первая картинка в теме / обрезать постер / яндекс апи
    for (theme_id, theme_title), count in sorted_themes:
        theme_info = get_theme_info(theme_id)
        theme_trends.append({
            'id': theme_id,
            'title': theme_title,
            'day': count,
            'avatar': theme_info['avatar'],
            'bg': theme_info['bg'],
            'description': theme_info['description']

        })
    return theme_trends


def sort_documents(docs):
    document_trends = []
    sorted_docs = sorted(docs[0].items(), key=lambda x: x[1], reverse=True)
    for doc_id, doc_count in sorted_docs:
        document_trends.append({'id': doc_id,
                                'data': docs[1][doc_id]})

    return document_trends
    

def get_potential_trends(tag, feed_params):

    documents = dict()
    carousels = CarouselsRequest.get_response(tag=tag, **feed_params).get_carousels()
    for carousel_id in carousels:
        new_documents, feed_params['cache_hash'] = get_documents_from_carousel(carousel_id, feed_params)
        documents.update(new_documents)

    doc_to_comments = get_comments(documents)
    theme_to_comments = group_comments_by_themes(documents, doc_to_comments)

    theme_to_count = count_comments_by_themes(theme_to_comments)
    doc_to_count = count_comments_by_docs(doc_to_comments)

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

    # theme_id ~ (theme_id, theme_title)
    for theme_id in theme_to_comments:
        comments_ts = [int((str(ts)[:-6])) for ts in theme_to_comments[theme_id]]
        theme_to_count[theme_id] = count_comments(comments_ts)

    return theme_to_count


def count_comments_by_docs(doc_to_comments):
    doc_to_count = dict()

    for doc_id in doc_to_comments:
        comments_ts = [int((str(ts)[:-6])) for ts in doc_to_comments[doc_id]]
        doc_to_count[doc_id] = count_comments(comments_ts)

    return doc_to_count


def count_comments(comments_ts):
    comments_ts.sort(reverse=True)
    today = datetime.today()
    day_count = count_comments_from(today - timedelta(days=1), comments_ts)
    # week = count_comments_from(today - timedelta(days=7), comments)
    # month = count_comments_from(today - timedelta(days=30), comments)

    return day_count


def count_comments_from(past_date, comments_ts) -> int:
    past_date = past_date.timestamp()

    count = 0
    # Можно использовать бинарный поиск
    for timestamp in comments_ts:
        if timestamp > past_date:
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

