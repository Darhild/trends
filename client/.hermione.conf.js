module.exports = {
	baseUrl: 'http://localhost:3000',
	gridUrl: 'http://localhost:4444/wd/hub',
	sets: {
        desktop: {
            files: 'tests/desktop'
        }
    },
	browsers: {
		 chrome_screen_m: {
			compositeImage: true,
			desiredCapabilities: {
				browserName: 'chrome'
			},
			screenshotsDir: 'hermione-html-report/chrome_screen_m',
			windowSize: {
				width: 700,
				height: 1000
			}
		 },
		 chrome_screen_l: {
			compositeImage: true,
			desiredCapabilities: {
				browserName: 'chrome'
			},
			screenshotsDir: 'hermione-html-report/chrome_screen_l',
			windowSize: {
				width: 1100,
				height: 1000
			}
		 },
		 chrome_screen_xl: {
			compositeImage: true,
			desiredCapabilities: {
				browserName: 'chrome'
			},
			screenshotsDir: 'hermione-html-report/chrome_screen_xl',
			windowSize: {
				width: 1400,
				height: 1200
			}
		 }
	},
	plugins: {
		'html-reporter/hermione': {
			path: 'hermione-html-report'
		}
	}
}