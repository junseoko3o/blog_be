// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { ChatLog, ChatLogDocument } from './mongo.schema';
// import { Model } from 'mongoose';
// import { MongoChatDto } from './dto/mongo.chat.dto';
// import { MongoDateDto } from './dto/mongo-find.date';
// import * as moment from 'moment-timezone';

// @Injectable()
// export class MongoService {
//   constructor(
//     @InjectModel(ChatLog.name) private chatLogModel: Model<ChatLogDocument>,
//   ) {}


//   async create(dto: MongoChatDto) {
//     const create = new this.chatLogModel(dto);
//     return create.save();
//   }

//   async findAll() {
//     return await this.chatLogModel.find().exec();
//   }

//   async getChatLogBySessionId(sessionId: string) {
//     return await this.chatLogModel.find({ sessionId }).exec();
//   }

//   async getChatLogByProjectKey(projectKey: string) {
//     const currentDate = moment().tz('Aisa/Seoul');
//     const lastMonday = currentDate.clone().subtract(1, 'weeks').startOf('isoWeek');
//     const lastSunday = lastMonday.clone().add(6, 'days');
//     return await this.chatLogModel.find({ 
//       projectKey: projectKey,
//       chatedAt: {
//         $gte: lastMonday.format('YYYY-MM-DD'),
//         $lte: lastSunday.format('YYYY-MM-DD'),
//       },
//     }).exec();
//   }
// }
