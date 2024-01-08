import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: '192.168.0.6',
        port: 6379,
        password: 'asdf123'
      }
    }),
  ],
  providers: [
    RedisCacheService,
  ]
})
export class RedisCacheModule {}
