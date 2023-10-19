import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { CreateChatDto } from './dto/create-chat.dto';
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
    this.server.emit('message', createChatDto);
  }
}
