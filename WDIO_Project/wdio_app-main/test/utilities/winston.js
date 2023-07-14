const winston = require('winston');
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: __dirname + `/../logs/success.log`, json: false, 'timestamp': true })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: __dirname + `/../logs/error.log`, json: false, 'timestamp': true })
    ],
    exitOnError: false,
    timestamp: true
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        timestamp: true,
        format: winston.format.simple()
    }));
}
module.exports = logger;
