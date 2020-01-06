require('dotenv').config();
const app = require('express')();
const appName = require('./../package').name;
const compression = require('compression');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const path = require('path');
const serveStatic = require('serve-static');
// const serverless = require('serverless-http');
const revUtils = require('./services/revUtils');
const cwd = process.cwd();

const PORT = 8080;

const port = process.env.PORT || PORT;

log4js.configure({
  appenders: { console: { type: 'console' } },
  categories: { default: { appenders: ['console'], level: process.env.LOG_LEVEL } }
});

const logger = log4js.getLogger(appName);

app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'debug' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

/**
 * Here, Database connection is initialize.
 */
require('./db/db');

/**
 * Setting API endpoint.
 */
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  /**
   * Serve static revved files with a unconditional cache.
   */
  app.use(serveStatic(path.join(cwd, 'build'), {
    index: false,
    setHeaders: (res, path) => {
      if (revUtils.isRevved(path)) 
        res.setHeader('Cache-Control', 'public, immutable, max-age=31536000');
    }
  }));

  /**
   * Route to any non-API & non-static file to React Client Router for SPA Dev.
   */
  app.use((req, res) => {
    res.sendFile(path.join(cwd, 'build', 'index.html'));
  });
// eslint-disable-next-line brace-style
}

app.use((req, res) => {
  res.status(404);
  res.json({
    message: '404 – Route Not Found'
  });
});

app.listen(port, () => {
  logger.info(`Current Work Directory => ${cwd}`);
  logger.info(`Server listening on http://localhost:${port}`);
});

module.exports = app;

