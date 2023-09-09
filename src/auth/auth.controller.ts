import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Public } from './public.decorator';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { Response, Request } from 'express';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { JwtAccessAuthGuard } from './guard/jwt-access.guard';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.userService.validateUser(loginDto);
    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);
  
    await this.authService.setRefreshToken(user.user_email, refreshToken);
    res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME),
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME),
    });
    await this.userService.updateUser(user.id, {
      user_email: user.user_email,
      user_name: user.user_name,
      password: user.password,
      login_at: new Date()
    });
    return {
      id: user.id,
      user_email: user.user_email,
      user_name: user.user_name,
      access_token: accessToken,
      login_at: new Date(),
    }
  }

  @Post('logout')
  @UseGuards(JwtRefreshGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.removeRefreshToken(req.user.id);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.send({
      message: 'logout success'
    });
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  async regenerateAccessToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const newAccessToken = await this.authService.refresh(user);
    res.setHeader('Authorization', 'Bearer ' + newAccessToken);
    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME),
    });
    res.send({
      id: user.id,
      user_email: user.user_email,
      user_name: user.user_name,
      access_token: newAccessToken,
    });
  }

  @Get('authenticate')
  @UseGuards(JwtAccessAuthGuard)
  async user(@Req() req: Request, @Res() res: Response) {
    const id: number = req.user.id; 
    const verifiedUser: User = await this.userService.findOneUser(id);
    const { password, ...result } = verifiedUser; 
    return res.send(result);
  }
}
