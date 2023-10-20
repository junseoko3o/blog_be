import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async userCheck(userId: number) {
    return await this.userService.findOneUser(userId);
  }
}
