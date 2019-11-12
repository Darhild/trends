from flask import abort


def parameter_to_int(param, param_name):
    try:
        param = int(param)
        if param <= 0:
            abort(400, "Parameter {} should be positive integer".format(param_name))
    except ValueError as e:
        abort(400, "Parameter {} should be positive integer".format(param_name))
    return param


def handle_trends_request(request):
    # непонятно проверять ли тэг на соотвествие списку тэгов
    # или возврщаеть пустой ответ в случае несуществующего тэга
    tag = request.args.get('tag')

    num_docs = request.args.get('num_docs')
    if num_docs is None:
        num_docs = 20

    num_docs = parameter_to_int(num_docs, 'num_docs')

    period = request.args.get('period')
    if period is None:
        period = 1

    period = parameter_to_int(period, 'period')

    source = request.args.get('source')
    if source is None:
        source = 'all'
    if source not in ('all', 'google', 'efir'):
        abort(400, "Parameter source should be 'efir' or 'google'")
    return tag, num_docs, period, source
