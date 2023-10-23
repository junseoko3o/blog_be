import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ChatService } from './chat.service';
import { User } from 'src/user/user.entity';

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

  @SubscribeMessage('login')
  async loginUser(@MessageBody() user: User) {
    await this.chatService.userCheck(user.id);
    await this.chatService.addConnectedUser(user.id);
    const userList = await this.chatService.getConnectedUserList();
    this.server.emit('loggedIn', {
      user,
      userList,
      login: true,
    });
  }

  @SubscribeMessage('logout')
  @UseGuards(AuthGuard)
  async logoutUser(@MessageBody() user: User) {
    await this.chatService.userCheck(user.id);
    await this.chatService.disconnectedUser(user.id);
    const userList = await this.chatService.getConnectedUserList();
    this.server.emit('logOut', {
      user,
      userList,
      login: false,
    });
  }
}
