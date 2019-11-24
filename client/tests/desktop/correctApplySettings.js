const assert = require('chai').assert;

describe('Табы трендов корректно переключаются', function () {
	it('на неделю', async function () {
		return this.browser
			.url('/')
			.waitForExist('.Tabs', 1000)
			.click('.Tabs-Item:nth-child(2)')
			.url('/')
			.waitForExist('.Tabs', 1000)
			.getText('.Tabs-Item_state_active')
			.then(function (text) {
				assert.equal(text, 'Неделю');
			})
			.assertView('week', '.Tabs');
	});
	it('на месяц', async function () {
		return this.browser
			.url('/')
			.waitForExist('.Tabs', 1000)
			.click('.Tabs-Item:nth-child(3)')
			.url('/')
			.waitForExist('.Tabs', 1000)
			.getText('.Tabs-Item_state_active')
			.then(function (text) {
				assert.equal(text, 'Месяц');
			})
			.assertView('month', '.Tabs');
	});
});

describe('В настройках можно переключить отображение блока трендов на главной', function () {
	it('на широкие карточки', async function () {
		return this.browser
			.url('/settings')
			.waitForExist('.Settings', 500)
			.$('.Settings-Item:nth-child(1)')
			.selectByIndex('0')
			.$('.Settings-Item:nth-child(2)')
			.selectByIndex('1')
			.url('/')
			.waitForExist('.Trends', 8000)
			.assertView('trends-main-1', '.Trends', { ignoreElements: ['.TrendCard', '.Tabs'] });
	});
	it('на карточки с вынесенным описанием', async function () {
		return this.browser
			.url('/settings')
			.waitForExist('.Settings', 500)
			.$('.Settings-Item:nth-child(1)')
			.selectByIndex('1')
			.$('.Settings-Item:nth-child(2)')
			.selectByIndex('1')
			.url('/')
			.waitForExist('.Trends', 8000)
			.assertView('trends-main-2', '.Trends', { ignoreElements: ['.TrendCard', '.Tabs'] });
	});
});

describe('В настройках можно переключить отображение блока трендов на странице трендов', function () {
	it('на карточки с вынесенным описанием', async function () {
		return this.browser
			.url('/settings')
			.waitForExist('.Settings', 500)
			.$('.Settings-Item:nth-child(1)')
			.selectByIndex('1')
			.url('/main/trends')
			.waitForExist('.TrendsList', 8000)
			.assertView('trends-2', '.App-Content', { ignoreElements: ['.TrendsList-Item', '.Tabs'] });
	});
});