import winston from 'winston';

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
});

logger.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/exceptions.log' })
);
