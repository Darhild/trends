const assert = require('assert');

module.exports = (hermione) => {
	hermione.on(hermione.events.NEW_BROWSER, (browser) => {
		browser.addCommand('assertText', async (selector, expectedText) => {
			return browser
			.waitForExist(selector, 8000)
			.getText(selector)
			.then(function (text) {
				assert.equal(text, expectedText);
			});
		});

		browser.addCommand('selectSettings', async (selector, index) => {
			return browser
			.waitForExist(selector, 500)
			.$(selector)
			.selectByIndex(index)
		});
	});
}