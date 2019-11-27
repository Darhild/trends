def sort(result):
    result_data = []
    if result is None or len(result) == 0:
        return result_data
    # Сортируем по day
    return sorted(result, key=lambda x: x["day"], reverse=True)


def sort_and_limit(data, limit):
    result_data = sort(data)

    # Лимитируем по limit
    data = result_data[:limit]

    # Выбираем только "data"
    result = []
    for r in data:
        result.append(r["data"])

    return result


def merge(src1, src2, factor1, factor2, limit):
    src1_idx, src2_idx = 0, 0
    result = []
    counter = 1

    while len(result) < limit:

        if counter % factor1 == 0:
            if src1_idx < len(src1):
                result.append(src1[src1_idx])
                src1_idx += 1
            elif src2_idx < len(src2):
                result.append(src2[src2_idx])
                src2_idx += 1

        if counter % factor2 == 0:
            if src2_idx < len(src2):
                result.append(src2[src2_idx])
                src2_idx += 1
            elif src1_idx < len(src1):
                result.append(src1[src1_idx])
                src1_idx += 1

        counter += 1

        if src1_idx >= len(src1) and src2_idx >= len(src2):
            break

    return result
