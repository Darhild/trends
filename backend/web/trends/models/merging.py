from collections import defaultdict


def group_by_title(data):
    title_score = defaultdict(int)
    for d in data:
        title = d['title']
        title_score[title] += d['day']
    titles = set()
    result = list()
    for d in data:
        title = d['title']
        if title not in titles:
            titles.add(title)
            result.append({'title': title, 'data': d['data'], 'day': title_score[title]})
    return result


def update_old(new_data, old_data):
    """

    new_data = {'movie': [{'id': 1, 'day': 1}, ]}
    old_data = {'movie': [{'id': 1, 'day': 0}, ]}

    """

    old_data = {item[0]: item[1] for item in old_data.items()}

    tags = set(new_data.keys()) | set(old_data.keys())
    updated_data = {}
    for tag in tags:
        updated_tag_data = []

        if tag not in new_data:
            updated_data[tag] = old_data[tag]
            continue

        if tag not in old_data:
            updated_data[tag] = new_data[tag]
            continue

        # id to trend mapping
        old_trends = {trend['id']: trend for trend in old_data[tag]}
        new_trends = {trend['id']: trend for trend in new_data[tag]}
        trend_ids = set(new_trends.keys()) | set(old_trends.keys())

        for trend_id in trend_ids:

            if trend_id not in old_trends:
                updated_tag_data.append(new_trends[trend_id])
            elif trend_id not in new_trends:
                updated_tag_data.append(old_trends[trend_id])
            else:
                if new_trends[trend_id]['day'] <= old_trends[trend_id]['day']:
                    updated_tag_data.append(old_trends[trend_id])
                else:
                    updated_tag_data.append(new_trends[trend_id])

        updated_data[tag] = updated_tag_data

    updated_data = [
        {"category": key, "data": value}
        for key, value in updated_data.items()
    ]
    return updated_data
