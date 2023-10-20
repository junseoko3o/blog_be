import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @Get('/list')
  async getMessageToRedis() {
    return await this.chatService.getChatMessagesByUserId();
  }

}
