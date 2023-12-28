import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserService } from 'src/user/user.service';
import { RedisCacheService } from 'src/common/redis/redis-cache.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisCacheService,
  ) {}

  private connectedUser: number[] = [];

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

  async addConnectedUser(userId: number) {
    const user = await this.userCheck(userId);
    if (!await this.connectedUser.includes(user.id)) {
       await this.connectedUser.push(userId);
    }
  }

  async disconnectedUser(userId: number) {
    const index = await this.connectedUser.indexOf(userId);
    if (index !== -1) {
      return await this.connectedUser.splice(index, 1);
    }
  }

  async getConnectedUserList() {
    return await this.connectedUser.length;
  }
}
