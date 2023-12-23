import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtAccessAuthGuard } from './guard/jwt-access.guard';
import CryptoAes256Gcm from 'src/common/crypto/crypto';
import { RedisCacheService } from 'src/common/redis/redis-cache.service';

@Module({
  imports: [
    // PassportModule.register({ session: true }),
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
        } 
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtModule,
    JwtRefreshStrategy,
    JwtAccessAuthGuard,
    CryptoAes256Gcm,
    RedisCacheService,
  ]
})
export class AuthModule {}
