describe('Переход на страницу трендов происходит', function () {
	it('после клика на заголовок "Самое популярное"', async function () {
		return this.browser
			.url('/settings')
			.selectSettings('[name="variant"]', 0)
			.url('/')
			.waitForExist('.Trends', 8000)
			.click('.Trends .Title-Link')
			.waitForExist('.TrendsList', 8000)
			.assertView('TrendsPage', '.App-Content', { ignoreElements: ['.TrendsList-Item', '.Tabs'] });
	});
	hermione.skip.in(['chrome_screen_l', 'chrome_screen_xl'], "no button on l & xl width");
	it('после клика на кнопку "Показать все популярные темы"', async function () {
		return this.browser
			.url('/settings')
			.selectSettings('[name="variant"]', 0)
			.url('/')
			.waitForExist('.Trends', 8000)
			.click('.Trends-More')
			.waitForExist('.TrendsList', 8000)
			.assertView('TrendsPage', '.App-Content', { ignoreElements: ['.TrendsList-Item', '.Tabs'] });
	});
});

describe('После клика на карточку тренда', function () {
	it('происходит переход на страницу этого тренда с главной', async function () {
		return this.browser
			.url('/settings')
			.selectSettings('[name="main"]', 0)
			.url('/')
			.waitForExist('.Trends', 8000)
			.click('.Carousel-Item:first-child .Trends-Link')
			.waitForExist('.OneTrendPage-Item', 8000)
			.assertView('OneTrendPage', '.App-Content', {
				ignoreElements: ['.OneTrendPage-Item', '.TrendCard', '.TrendDetails-Info']
			});
	});
	it('происходит переход на страницу этого тренда со страницы трендов', async function () {
		return this.browser
			.url('/settings')
			.url('/main/trends')
			.waitForExist('.TrendsList', 8000)
			.click('.TrendsList-Link:first-child')
			.waitForExist('.OneTrendPage-Item', 8000)
			.assertView('OneTrendPage', '.App-Content', {
				ignoreElements: ['.OneTrendPage-Item', '.TrendCard', '.TrendDetails-Info']
			});
	});
});