import setuptools

setuptools.setup(name='trends',
                 version='1.0',
                 description='Provides actual trends',
                 url='http://github.com/oleg.fry/project-dummy',
                 author='Anonymous',
                 author_email='oleg.fry@gmail.com',
                 license='MIT',
                 python_requires='>=3.7',
                 include_package_data=True,
                 packages=setuptools.find_packages(),
                 zip_safe=False,
                 install_requires=[
                     'flask',
                     'sqlalchemy',
                     'psycopg2-binary',
                     'alembic',
                     'apscheduler',
                     'flask_caching',
                     'requests',
                 ],
                 )
