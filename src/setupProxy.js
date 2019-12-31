const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    proxy({
      target: process.env.NODE_ENV === 'production' ? 'https://mern-core.netlify.com:8080' : 'http://localhost:1313',
      changeOrigin: true,
      secure: true
    })
  );
};
