import os

from trends.app import create_app
from trends.collectors.efir import EfirCollector
from trends.collectors.google import GoogleCollector
from trends.models.trends_repo import Repository

if __name__ == '__main__':
    # export DATABASE_URL=postgresql://me:hackme@0.0.0.0/trends
    print('DATABASE_URL', os.environ['DATABASE_URL'])

    app = create_app(os.environ['DATABASE_URL'])

    repo = Repository(app.db)
    collectors = [EfirCollector(repo, os.environ['EFIR_URL']),
                  GoogleCollector(repo, os.environ['GOOGLE_URL'])]
    for c in collectors:
        c.start()

    app.run(host='0.0.0.0', port=8080)
