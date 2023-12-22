// import { INestApplication } from "@nestjs/common";
// import { Redis } from "ioredis";
// import * as cookieParser from "cookie-parser";
// import * as session from "express-session";
// import * as passport from 'passport';
// import RedisStore from "connect-redis";

// export function redisConnectSession(app: INestApplication): void {
//     const client = new Redis({
//     host: process.env.REDIS_HOST,
//     port: parseInt(process.env.REDIS_PORT),
//     password: process.env.REDIS_PASSWORD
//   });
//   const redisStore = new RedisStore({
//     client,
//     ttl: parseInt(process.env.SESSION_EXPIRED_IN),
//   });

//   app.use(cookieParser(process.env.SESSION_SECRET));
//   app.use(
//     session({
//       secret: process.env.SESSION_SECRET,
//       name: process.env.SESSION_NAME,
//       saveUninitialized: false,
//       resave: false,
//       rolling: true,
//       store: redisStore,
//       cookie: {
//         secure: process.env.SESSION_SECURE === 'true',
//         httpOnly: process.env.HTTP_ONLY === 'true',
//       },
//     }),
//   );
//   app.use(passport.initialize());
//   app.use(passport.session());
// }