from flask_caching import Cache
from pytrends.request import TrendReq


class RealTrendReq(TrendReq):
    @staticmethod
    def rating_to_int(rating_string):
        qualifier = rating_string[-2]
        number = int(rating_string[:-2])
        if qualifier == 'M':
            number *= 1000000
        elif qualifier == 'K':
            number *= 1000
        return number

    def today_searches_fine(self, pn='RU'):
        """Requests data from Google Daily Trends section for daily trends
        Returns list of dicts of trends for current date"""
        trends_list = list()
        keys = ('title', 'avatar', 'description', 'day')
        forms = {'ns': 15, 'geo': pn, 'tz': '-180', 'hl': 'en-US'}
        req_json = self._get_data(
            url=TrendReq.TODAY_SEARCHES_URL,
            method=TrendReq.GET_METHOD,
            trim_chars=5,
            params=forms
        )['default']['trendingSearchesDays'][0]
        date = req_json['date']
        trends = req_json['trendingSearches']
        for trend in trends:
            rating_string = trend['formattedTraffic']
            rating = self.rating_to_int(rating_string)
            title = (trend['title']['query']).replace(u'\xa0', u' ')
            try:
                avatar = trend['image']['imageUrl']
            except KeyError:
                avatar = ""
            try:
                description = (trend['articles'][0]['title']).replace(u'&quot;', u' ')
            except KeyError:
                description = ""
            record = (title, avatar, description, rating)
            trends_list.append(dict(zip(keys, record)))
        return trends_list


cache = Cache(config={'CACHE_TYPE': 'simple', "CACHE_DEFAULT_TIMEOUT": 0})
