const winston = require('winston');
const logger = winston.createLogger({
    level: 'http',
    format: winston.format.json(),
    defaultMeta: { service: 'server' },
    transports: [
        new winston.transports.File({ filename: Date.now().toISOString() }),
    ],
});

module.exports = logger;
