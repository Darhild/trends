const assert = require('chai').assert;

describe('Корректно отображается активная категория', function () {
	it('на главной странице', async function () {
		return this.browser
			.url('/')
			.waitForExist('.Categories-Item_state_active', 8000)
			.getText('.Categories-Item_state_active')
			.then(function (text) {
				assert.equal(text, 'Что посмотреть');
			})
			.assertView('main', '.Categories');
	});
	it('на странице фильмов', async function () {
		return this.browser
			.url('/movie')
			.waitForExist('.Categories-Item_state_active', 8000)
			.getText('.Categories-Item_state_active')
			.then(function (text) {
				assert.equal(text, 'Фильмы');
			})
			.assertView('movie', '.Categories');
	});
	it('на странице сериалов', async function () {
		return this.browser
			.url('/series')
			.waitForExist('.Categories-Item_state_active', 8000)
			.getText('.Categories-Item_state_active')
			.then(function (text) {
				assert.equal(text, 'Сериалы');
			})
			.assertView('series', '.Categories');
	});
	it('на странице мультфильмов', async function () {
		return this.browser
			.url('/kids')
			.waitForExist('.Categories-Item_state_active', 8000)
			.getText('.Categories-Item_state_active')
			.then(function (text) {
				assert.equal(text, 'Мультфильмы');
			})
			.assertView('kids', '.Categories');
	});
	it('на странице блогеров', async function () {
		return this.browser
			.url('/blogger')
			.waitForExist('.Categories-Item_state_active', 8000)
			.getText('.Categories-Item_state_active')
			.then(function (text) {
				assert.equal(text, 'Блогеры');
			})
			.assertView('blogger', '.Categories');
	});
});

describe('На главной странице корректно отображается', function () {
	it('плеер', async function () {
		return this.browser
			.url('/')
			.waitForExist('.FeedPlayer-Player', 8000)
			.assertView('player', '.FeedPlayer-Player');
	});
	hermione.skip.in('chrome_screen_m', "no carousel on m width");
	it('карусель справа от плеера', async function () {
		return this.browser
			.url('/')
			.waitForExist('.FeedPlayer-Carousel', 8000)
			.assertView('carousel', '.FeedPlayer-Carousel');
	});
	hermione.skip.in('chrome_screen_m', "no channels on m width");
	it('список каналов', async function () {
		return this.browser
			.url('/')
			.waitForExist('.Channels', 8000)
			.assertView('channels', '.Channels');
	});
	it('блок трендов', async function () {
		return this.browser
			.url('/settings')
			.waitForExist('.Settings', 500)
			.$('.Settings-Item:nth-child(1)')
			.selectByIndex('0')
			.$('.Settings-Item:nth-child(2)')
			.selectByIndex('0')
			.url('/')
			.waitForExist('.Trends', 8000)
			.assertView('trends', '.Trends', { ignoreElements: ['.Carousel-Item', '.Tabs'] });;
	});
	it('карусель обсуждаемых видео', async function () {
		return this.browser
			.url('/')
			.waitForExist('.Commented', 8000)
			.assertView('commented', '.Commented', { ignoreElements: ['.Carousel-Item'] });
	});
});