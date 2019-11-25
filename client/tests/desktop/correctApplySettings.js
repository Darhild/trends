const assert = require('chai').assert;

describe('Табы трендов корректно переключаются', function () {
	it('на неделю', async function () {
		return this.browser
			.url('/')
			.waitForExist('.Trends .Tabs', 1000)
			.click('.Trends .Tabs-Item:nth-child(2)')
			.url('/')
			.assertText('.Trends .Tabs-Item:nth-child(2)', 'Неделю')
			.assertView('trends-week', '.Trends .Tabs');
	});
	it('на месяц', async function () {
		return this.browser
			.url('/')
			.waitForExist('.Trends .Tabs', 1000)
			.click('.Trends .Tabs-Item:nth-child(3)')
			.url('/')
			.assertText('.Trends .Tabs-Item:nth-child(3)', 'Месяц')
			.assertView('trends-month', '.Trends .Tabs');
	});
});

describe('Табы видео корректно переключаются', function () {
	it('на неделю', async function () {
		return this.browser
			.url('/')
			.waitForExist('.Commented .Tabs', 8000)
			.click('.Commented .Tabs-Item:nth-child(2)')
			.url('/')
			.assertText('.Commented .Tabs-Item:nth-child(2)', 'Неделю')
			.assertView('videos-week', '.Commented .Tabs');
	});
	it('на месяц', async function () {
		return this.browser
			.url('/')
			.waitForExist('.Commented .Tabs', 8000)
			.click('.Commented .Tabs-Item:nth-child(3)')
			.url('/')
			.assertText('.Commented .Tabs-Item:nth-child(3)', 'Месяц')
			.assertView('videos-month', '.Commented .Tabs');
	});
});

describe('В настройках можно переключить отображение блока трендов на главной', function () {
	it('на широкие карточки', async function () {
		return this.browser
			.url('/settings')
			.selectSettings('[name="variant"]', 0)
			.selectSettings('[name="main"]', 1)
			.url('/')
			.waitForExist('.Trends', 8000)
			.assertView('trends-main-1', '.Trends', { ignoreElements: ['.TrendCard', '.Tabs'] });
	});
	it('на карточки с вынесенным описанием', async function () {
		return this.browser
			.url('/settings')
			.selectSettings('[name="variant"]', 1)
			.selectSettings('[name="main"]', 1)
			.url('/')
			.waitForExist('.Trends', 8000)
			.assertView('trends-main-2', '.Trends', { ignoreElements: ['.TrendCard', '.Tabs'] });
	});
});

describe('В настройках можно переключить отображение блока трендов на странице трендов', function () {
	it('на карточки с вынесенным описанием', async function () {
		return this.browser
			.url('/settings')
			.selectSettings('[name="variant"]', 1)
			.url('/main/trends')
			.waitForExist('.TrendsList', 8000)
			.assertView('trends-2', '.App-Content', { ignoreElements: ['.TrendsList-Item', '.Tabs'] });
	});
});