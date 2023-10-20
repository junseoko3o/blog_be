import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  @UseGuards(AuthGuard)
  async chatting(@MessageBody() createChatDto: CreateChatDto) {
    await this.chatService.userCheck(createChatDto.userId);
    await this.chatService.saveMessageToRedis(createChatDto);
    this.server.emit('message', createChatDto);
  }
}
