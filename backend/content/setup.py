import setuptools

setuptools.setup(
    name="comment_trends",
    version="1.0",
    description="Provides trends by counting comments in efir documents",
    url="http://github.com/oleg.fry/project-dummy",
    author="Denis Antipov",
    author_email="antipov.dg@yandex.ru",
    license="MIT",
    python_requires=">=3.6",
    package_data={"": ["*.yaml"]},
    include_package_data=True,
    packages=setuptools.find_packages(exclude="draft"),
    zip_safe=False,
    install_requires=["requests", "flask", "Flask-Caching", "apscheduler", "PyYaml"],
)
