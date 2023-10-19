import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/jwt-auth.guard';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  @UseGuards(AuthGuard)
  chatting(@MessageBody() createChatDto: CreateChatDto) {
    this.server.emit('message', createChatDto.message);
  }
}
