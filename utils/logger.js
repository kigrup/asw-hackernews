const winston = require('winston');
const moment = require('moment');

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message} `;
    if (metadata) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: 'server' },
    transports: [
        new winston.transports.File({
            filename: './logs/' + moment().format() + '.log',
        }),
    ],
});

module.exports = logger;
