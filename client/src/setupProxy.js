const proxy = require('http-proxy-middleware');
const API_URL = 'http://ether-backend.ru:8080';
const STORY_URL = 'http://www.84.201.143.123.xip.io';

module.exports = function(app) {
  app.use(
    '/api/',
    proxy({
      target: API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    '/stories/',
    proxy({
      target: STORY_URL,
      changeOrigin: true,
    })
  );
};
