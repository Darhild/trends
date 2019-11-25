describe('Корректно отображается активная категория', function () {
	it('на главной странице', async function () {
		return this.browser
			.url('/')
			.assertText('.Categories-Item_state_active', 'Что посмотреть')
			.assertView('main', '.Categories');
	});
	it('на странице фильмов', async function () {
		return this.browser
			.url('/movie')
			.assertText('.Categories-Item_state_active', 'Фильмы')
			.assertView('movie', '.Categories');
	});
	it('на странице сериалов', async function () {
		return this.browser
			.url('/series')
			.assertText('.Categories-Item_state_active', 'Сериалы')
			.assertView('series', '.Categories');
	});
	it('на странице мультфильмов', async function () {
		return this.browser
			.url('/kids')
			.assertText('.Categories-Item_state_active', 'Мультфильмы')
			.assertView('kids', '.Categories');
	});
	it('на странице блогеров', async function () {
		return this.browser
			.url('/blogger')
			.assertText('.Categories-Item_state_active', 'Блогеры')
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
			.selectSettings('[name="main"]', 0)
			.url('/')
			.waitForExist('.Trends', 8000)
			.assertView('trends', '.Trends', { ignoreElements: ['.Carousel-Item', '.Tabs'] });;
	});
	it('карусель обсуждаемых видео', async function () {
		return this.browser
			.url('/')
			.waitForExist('.Commented', 8000)
			.assertView('commented', '.Commented', { ignoreElements: ['.Carousel-Item', '.Tabs'] });
	});
});