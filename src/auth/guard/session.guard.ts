// import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { RedisCacheService } from 'src/common/redis-cache/redis-cache.service';

// @Injectable()
// export class SessionGuard extends AuthGuard('local') {
//   constructor(
//     private readonly redisCacheService: RedisCacheService,
//   ) {
//     super();
//   }
//   async canActivate(context: ExecutionContext) {
//     const result = (await super.canActivate(context)) as boolean;
//     const request = context.switchToHttp().getRequest();
//     const email = request.user.email;
//     // const findUser = await this.redisCacheService.getKey(email);
//     await super.logIn(request);
//     await this.redisCacheService.setKeyValue(email, request.sessionID, 'EX', parseInt(process.env.SESSION_EXPIRED_IN));
//     return result;
//   }
// }
