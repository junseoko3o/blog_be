// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { AuthService } from './auth.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super({
//       usernameField: 'email',
//     });
//   }

//   async validate(email: string, password: string) {
//     const users =
//       (await this.authService.validateUser({
//         email,
//         password,
//       })) ||
//       (await this.authService.validateAdmin({
//         email,
//         password,
//       }));
//     if (!users) {
//       throw new UnauthorizedException();
//     }
//     return users;
//   }
// }
