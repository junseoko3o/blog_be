// import { Module } from '@nestjs/common';
// import { MongoService } from './mongo.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ChatLog, ChatLogDocument } from './mongo.schema';
// import { ConfigModule } from '@nestjs/config';
// import { MongoController } from './mongo.controller';
// import { ScheduleModule } from '@nestjs/schedule';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     ScheduleModule.forRoot(),
//     MongooseModule.forFeature(
//       [
//         {
//           name: ChatLog.name,
//           schema: ChatLogDocument,
//         },
//     ]),
//   ],
//   controllers: [MongoController],
//   providers: [
//     MongoService,
//   ],
//   exports: [
//     MongoService,
//   ],
// })
// export class MongoModule {}
