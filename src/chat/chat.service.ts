import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { UserService } from 'src/user/user.service';
import { RedisCacheService } from 'src/common/redis/redis-cache.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisCacheService,
  ) {}

  async userCheck(userId: number) {
    return await this.userService.findOneUser(userId);
  }

  async saveMessageToRedis(createChatDto: CreateChatDto) {
    const key = 'group';
    const existingMessages = await this.redisService.getKey(key);
    let messages = [];
    if (existingMessages) {
      messages = JSON.parse(existingMessages);
    }
    messages.push(createChatDto);
    await this.redisService.setKeyValue(key, JSON.stringify(messages), 'EX', 24 * 60 * 60);
  }

  async getChatMessagesByUserId(): Promise<CreateChatDto[]> {
    const key = 'group';
    const messages = await this.redisService.getKey(key);
    return messages ? JSON.parse(messages) : [];
  }
}
