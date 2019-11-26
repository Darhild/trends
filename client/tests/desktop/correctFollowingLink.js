const LOAD_TIMEOUT = 8000;

describe('Переход на страницу трендов происходит', function () {
	it('после клика на заголовок "Самое популярное"', async function () {
		return this.browser
			.url('/settings')
			.selectSettings('[name="variant"]', 0)
			.url('/')
			.waitForExist('.Trends', LOAD_TIMEOUT)
			.click('.Trends .Title-Link')
			.waitForExist('.TrendsList', LOAD_TIMEOUT)
			.assertView('TrendsPage', '.App-Content', { ignoreElements: ['.TrendsList-Item', '.Tabs'] });
	});
	hermione.skip.in(['chrome_screen_l', 'chrome_screen_xl'], "no button on l & xl width");
	it('после клика на кнопку "Показать все популярные темы"', async function () {
		return this.browser
			.url('/settings')
			.selectSettings('[name="variant"]', 0)
			.url('/')
			.waitForExist('.Trends', LOAD_TIMEOUT)
			.click('.Trends-More')
			.waitForExist('.TrendsList', LOAD_TIMEOUT)
			.assertView('TrendsPage', '.App-Content', { ignoreElements: ['.TrendsList-Item', '.Tabs'] });
	});
});

describe('После клика на карточку тренда', function () {
	it('происходит переход на страницу этого тренда с главной', async function () {
		return this.browser
			.url('/settings')
			.selectSettings('[name="main"]', 0)
			.url('/')
			.waitForExist('.Trends', LOAD_TIMEOUT)
			.click('.Carousel-Item:first-child .Trends-Link')
			.waitForExist('.OneTrendPage-Item', LOAD_TIMEOUT)
			.assertView('OneTrendPage', '.App-Content', {
				ignoreElements: ['.OneTrendPage-Item', '.OneTrendPage-Stories .Carousel-Item', '.TrendCard', '.TrendDetails-Info']
			});
	});
	it('происходит переход на страницу этого тренда со страницы трендов', async function () {
		return this.browser
			.url('/settings')
			.url('/main/trends')
			.waitForExist('.TrendsList', LOAD_TIMEOUT)
			.click('.TrendsList-Link:first-child')
			.waitForExist('.OneTrendPage-Item', LOAD_TIMEOUT)
			.assertView('OneTrendPage', '.App-Content', {
				ignoreElements: ['.OneTrendPage-Item', '.OneTrendPage-Stories .Carousel-Item', '.TrendCard', '.TrendDetails-Info']
			});
	});
});