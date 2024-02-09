import { Module } from '@nestjs/common';
import { HeartService } from './heart.service';
import { HeartController } from './heart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heart } from './heart.entity';
import { CommentModule } from 'src/comment/comment.module';
import { RecommentModule } from 'src/recomment/recomment.module';
import { UserModule } from 'src/user/user.module';
import { ContentModule } from 'src/content/content.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Heart]),
    UserModule,
    ContentModule,
    CommentModule,
    RecommentModule,
  ],
  controllers: [HeartController],
  providers: [
    HeartService,
  ],
})
export class HeartModule {}
