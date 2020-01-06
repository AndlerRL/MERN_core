const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    proxy({
      target: process.env.NODE_ENV === 'production' ? 'http://localhost:8080' : 'http://localhost:1313',
      changeOrigin: true,
      secure: false
    })
  );
};
