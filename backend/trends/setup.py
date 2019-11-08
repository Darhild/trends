import setuptools

setuptools.setup(name='trends',
                 version='1.0',
                 description='Provides trends from external services',
                 url='http://github.com/oleg.fry/project-dummy',
                 author='Antonina Gerasiova',
                 author_email="antonina.gerasiova@yandex.ru",
                 license='MIT',
                 python_requires='>=3.7',
                 include_package_data=True,
                 packages=setuptools.find_packages(),
                 zip_safe=False,
                 install_requires=[
                     'Flask',
                     'sqlalchemy',
                     'psycopg2-binary',
                     'alembic',
                     'apscheduler',
                     'pytrends',
                     'Flask-Caching',
                     'PyYaml',
                     'coloredlogs'
                 ],
                 )
