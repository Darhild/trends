from collections import defaultdict
from datetime import datetime, timedelta
from typing import Dict, List, Tuple
import json
import time

from flask_caching import Cache

from comment_trends.external_api.player import PlayerRequest
from comment_trends.external_api.comments import CommentsRequest
from comment_trends.external_api.carousels import CarouselsRequest
from comment_trends.external_api.feed import FeedRequest
from comment_trends.external_api.carousel import CarouselRequest
from comment_trends.external_api.theme import ThemeRequest
from comment_trends.external_api.collection import CollectionRequest
from comment_trends.trends_logic.config_parse import Config


cache = Cache(config={'CACHE_TYPE': 'simple', "CACHE_DEFAULT_TIMEOUT": 86400})

trends_config = Config()
api_config = trends_config.get_api_config()
tags = trends_config.get_tags()


def get_trends_cached(field):
    return cache.get(field)


def compute_trends():
    theme_trends = {}
    video_trends = {}
    for tag in tags:
        result = get_sorted_trends(tag)
        theme_result, video_result = result
        if theme_result:
            theme_trends[f'{tag}'] = theme_result
        if video_result:
            video_trends[f'{tag}'] = video_result

    if theme_trends:
        cache.set('theme_trends', json.dumps(theme_trends, ensure_ascii=False))
    if video_trends:
        cache.set('video_trends', json.dumps(video_trends, ensure_ascii=False))


def get_sorted_trends(tag):
    themes, docs_data = get_potential_trends(tag, api_config)

    theme_trends = sort_themes(themes)

    document_trends = sort_documents(docs_data)
    return theme_trends, document_trends


def sort_themes(themes):
    sorted_themes = sorted(themes.items(), key=lambda x: x[1], reverse=True)
    theme_trends = []
    # TODO возможно добавить поле video_count по release date
    used_avatars = set()
    for (theme_id, theme_title), count in sorted_themes:
        if count < 1:
            break

        theme_info = get_theme_info(theme_id)
        # как вариант можно обрезать исходный постер из theme_info или использовать картинки в поиске
        avatar = get_theme_avatar(theme_id, used_avatars)
        theme_trends.append({
            'id': theme_id,
            'title': theme_title,
            'day': count,
            'avatar': avatar,
            'bg': theme_info['bg'],
            'description': theme_info['description']
            })

    return theme_trends


def get_theme_avatar(theme_id, used_avatars):
    response = CollectionRequest.get_response(collection_id=theme_id, offset=0, limit=20)
    avatar = response.get_avatar(used_avatars)
    if avatar:
        used_avatars.add(avatar)
        return 'https:' + avatar
    else:
        return ""


def sort_documents(docs_data):
    document_trends = []
    documents, doc_to_count = docs_data
    sorted_docs = sorted(doc_to_count.items(), key=lambda x: x[1], reverse=True)
    for doc_id, doc_count in sorted_docs:
        if doc_count < 1:
            break

        doc_info = get_document_info(documents[doc_id])
        doc_info['comments_count'] = doc_count
        document_trends.append(doc_info)

    return document_trends
    

def get_potential_trends(tag, feed_params):

    documents = dict()
    carousels = CarouselsRequest.get_response(tag=tag, **feed_params).get_carousels()

    if not carousels:
        carousels = FeedRequest.get_response(tag=tag, **feed_params).get_carousels()

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
    doc_to_comments = dict()
    for doc_id in documents:
        response = CommentsRequest.get_response(doc_id)
        doc_to_comments[doc_id] = response.get_timestamps()
        documents[doc_id]['comment'] = response.get_top_comment_text()
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


def count_comments(comments_ts) -> int:
    comments_ts.sort(reverse=True)
    today = datetime.today()
    day_count = count_comments_from(today - timedelta(days=1), comments_ts)
    # week = count_comments_from(today - timedelta(days=7), comments)
    # month = count_comments_from(today - timedelta(days=30), comments)

    return day_count


def count_comments_from(past_date, comments_ts) -> int:
    past_date = past_date.timestamp()

    count = 0
    # Можно вместо линейного использовать бинарный поиск
    for timestamp in comments_ts:
        if timestamp > past_date:
            count += 1
        else:
            break

    return count


def get_theme_info(theme_id):
    response = ThemeRequest.get_response(theme_id)
    return response.get_info()


def get_document_info(data):
    doc_info = {}
    fields = ('title', 'duration', 'release_date_ut', 'onto_poster', 'thumbnail', 'comment')
    for field in fields:
        if field in data:
            doc_info[field] = data[field]
        else:
            doc_info[field] = ''

    for field in ('onto_poster', 'thumbnail'):
        if doc_info[field]:
            doc_info[field] = 'https:' + doc_info[field]

    if 'computed_title' in data:
        doc_info['title'] = data['computed_title']

    return doc_info


if __name__ == '__main__':
    t1 = time.time()
    for t in tags:
        print(t)
        th, doc = get_sorted_trends(t)[:10]
        print(th)
        print(doc)
    print(time.time() - t1)

