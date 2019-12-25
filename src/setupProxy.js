const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:1313',
      changeOrigin: true,
      secure: false
    })
  );
};
