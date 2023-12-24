// import * as winston from 'winston';
// import * as daily from 'winston-daily-rotate-file';
// const logDir = 'logs';  
// const { combine, timestamp, printf } = winston.format;

// const logFormat = printf(error => error.message);

// /*
//  * Log Level
//  * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
//  */
// const winstonLogger = winston.createLogger({
//   format: combine(
//     timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss',
//     }),
//     logFormat,
//   ),
//   transports: [
//     new (daily)({
//       level: 'info',
//       datePattern: 'YYYY-MM-DD',
//       dirname: logDir,
//       filename: `%DATE%.log`,
//       maxFiles: 30, 
//       zippedArchive: false, 
//     }),
//   ],
// });

// export { winstonLogger };