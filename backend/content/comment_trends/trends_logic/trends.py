from collections import defaultdict, namedtuple
from datetime import datetime, timedelta
from typing import Dict, List, Tuple
from pprint import pprint
import json
import time

from flask_caching import Cache

from comment_trends.external_api.player import PlayerRequest
from comment_trends.external_api.comments import CommentsRequest
from comment_trends.external_api.carousels import CarouselsRequest
from comment_trends.external_api.carousel import CarouselRequest

Counts = namedtuple('Counts', ['day', 'week', 'month'])
cache = Cache(config={'CACHE_TYPE': 'simple', "CACHE_DEFAULT_TIMEOUT": 0})
config = {'offset': 0, 'limit': 2, 'num_docs': 2}
tags = {"movie", "series", "kids", "sport", "blogger"}


def get_trends_cached():
    return cache.get('data')


def compute_trends():
    data = {}
    for tag in tags:
        result = get_sorted_trends(tag)
        data[f'{tag}'] = result

    cache.set('data', json.dumps(data, ensure_ascii=False))


def get_sorted_trends(tag):
    themes = get_potential_trends(tag, config)
    sorted_themes = sorted(themes.items(), key=lambda x: x[1].day, reverse=True)
    result = []
    # TODO добавить поле video_count
    for (theme_id, theme_title), counts in sorted_themes:
        result.append({
            'id': theme_id,
            'title': theme_title,
            'day': counts.day,
        })

    return result


def get_potential_trends(tag, feed_params) -> Dict[Tuple[str, str], Counts]:

    documents = dict()
    carousels = CarouselsRequest.get_response(tag=tag, **feed_params).get_carousels()
    for carousel_id in carousels:
        new_documents, feed_params['cache_hash'] = get_documents_from_carousel(carousel_id, feed_params)
        documents.update(new_documents)

    doc_to_comments = get_comments(documents)
    theme_to_comments = group_comments_by_themes(documents, doc_to_comments)
    theme_to_count = count_comments_by_themes(theme_to_comments)

    return theme_to_count


def get_documents_from_carousel(carousel_id, feed_params):
    response = CarouselRequest.get_response(carousel_id, offset=0, limit=feed_params['num_docs'])
    return response.get_documents(), response.get_cache_hash()


def get_comments(documents):
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


if __name__ == '__main__':
    t1 = time.time()
    pprint(get_sorted_trends('movie'))
    print(time.time() - t1)

