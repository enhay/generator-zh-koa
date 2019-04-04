const winston = require('winston');
const { format, transports } = winston;
const moment = require('moment');
const path = require('path');
const fs = require('fs');

let logger;


const customFormat = format(info => {
  info.level = info.level.toUpperCase();
  info.log = info.message;
  delete info.message;
  return info;
});

function initLogIns(app) {
  if (logger) {
    return logger
  }
  const logPath = `/data/logs/prjlogs/${process.env.DOMAIN}`;
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath, { recursive: true, mode: 0o777 })
  }
  logger = winston.createLogger({
    defaultMeta: { app },
    format: format.combine(
      customFormat(),
      format.json()
    ),
    transports: [
      new transports.File({
        level: 'info',
        filename: path.join(logPath, 'all.log')
      }),
      new transports.Console({})
    ]
  });
  return logger;
}
// todo:在这里做更多的逻辑封装一个transports
class XLogger {
  constructor(app, server) {
    this._server = server;
    initLogIns(app)
  }
  info(message, ...tags) {
    return this.log('info', message, ...tags);
  }
  error(message, ...tags) {
    return this.log('error', message, ...tags);
  }
  debug(message, ...tags) {
    return this.log('debug', message, ...tags);
  }
  log(level, message, ...tags) {
    return logger.log(level, message, { server: this._server, tags, time: moment().format('X') - 0 })
  }
}

XLogger.createLogger = function (app, server) {
  return new XLogger(app, server)
}

module.exports = XLogger;