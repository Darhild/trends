from flask_caching import Cache
from pytrends.request import TrendReq


class RealTrendReq(TrendReq):
    """
    Subclass of TrendReq,
    implements it's own logic of parsing daily google trends
    """

    @staticmethod
    def rating_to_int(rating_string):
        """
        :param rating_string:
        number of user requests in string format
        Convert google search measure
        of trend from string to integer
        :returns:
        trend rating as integer
        """
        qualifier = rating_string[-2]
        number = int(rating_string[:-2])
        if qualifier == 'M':
            number *= 1000000
        elif qualifier == 'K':
            number *= 1000
        return number

    def parse_day(self, req_json):
        """
        :param req_json: part of json represent one day
        :return:
        list of dicts of trends for current date
        current date got from json in a string format
        """
        trends_list = list()
        keys = ('title', 'avatar', 'description', 'day')
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
        return trends_list, date

    def today_searches_fine(self, pn='RU'):
        """
        Requests data from Google Daily Trends section for daily trends
        :return:
        list of dicts of trends for current date
        current date got from json in a string format
         """

        forms = {'ns': 15, 'geo': pn, 'tz': '-180', 'hl': 'en-US'}
        req_json = self._get_data(
            url=TrendReq.TODAY_SEARCHES_URL,
            method=TrendReq.GET_METHOD,
            trim_chars=5,
            params=forms
        )['default']['trendingSearchesDays'][0]
        data, date = self.parse_day(req_json)
        return data, date


# set cache timeout for one day for service not to return stale trends
# if google trends are unavailable
cache = Cache(config={'CACHE_TYPE': 'simple', "CACHE_DEFAULT_TIMEOUT": 86400})
