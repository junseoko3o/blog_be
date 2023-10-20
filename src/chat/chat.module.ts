import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UserModule } from 'src/user/user.module';
import { ChatController } from './chat.controller';
import { RedisCacheService } from 'src/common/redis/redis-cache.service';

@Module({
  imports: [
    UserModule,
  ],
  providers: [
    ChatGateway,
    ChatService,
    RedisCacheService,
  ],
  controllers: [ChatController]
})
export class ChatModule {}
