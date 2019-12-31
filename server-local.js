const app = require('./server/server');
const appName = require('./../package').name;
const log4js = require('log4js');
const cwd = process.cwd();

const PORT = 1313;

const port = process.env.PORT || PORT;

log4js.configure({
  appenders: { console: { type: 'console' } },
  categories: { default: { appenders: ['console'], level: process.env.LOG_LEVEL } }
});

const logger = log4js.getLogger(appName);

app.listen(port, () => {
  logger.info(`Current Work Directory => ${cwd}`);
  logger.info(`Server listening on http://localhost:${port}`);
});
