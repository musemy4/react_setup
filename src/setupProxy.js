const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/vurix-dms', {
      target: 'http://debugca-172-16-36-180.vurix.kr/',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/tms-decision', {
      target: 'http://docs-172-16-36-180.vurix.kr/',
      changeOrigin: true,
    })
  );
}