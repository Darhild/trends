from json import JSONDecodeError


def parse_json(response, logger):
    try:
        data = response.json()
    except JSONDecodeError as e:
        logger.debug("%s %s", type(e), e)
        return {}
    return data
