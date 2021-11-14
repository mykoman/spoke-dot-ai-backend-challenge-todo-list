import wiston from 'winston'
const { createLogger, format, transports } = wiston

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
    ),
    transports: [
        new transports.File({
            filename: './logs/all-logs.log',
            level: 'error',
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new transports.Console(),
    ],
})

export default logger
