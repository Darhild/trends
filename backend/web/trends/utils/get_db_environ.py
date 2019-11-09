import os


def get_environ_or_default(env, default):
    try:
        value = os.environ[env]
        if value == '':
            return default
        return value
    except Exception as e:
        return default