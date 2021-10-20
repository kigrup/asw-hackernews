const winston = require('winston');
const moment = require('moment');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp()
    ),
    defaultMeta: { service: 'server' },
    transports: [
        new winston.transports.File({
            filename: './logs/' + moment().format() + '.log',
        }),
    ],
});

module.exports = logger;
