import { AllowAnonymous } from '@auth/decorators/public.decorator';
import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenDto } from './interfaces/token.dto';
import { UserLoginDto } from '@user/models/dto/user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowAnonymous()
  @Version('1')
  @Post('/login')
  async login(@Body() authLoginDto: UserLoginDto) {
    return this.authService.token(
      await this.authService.validateUser(authLoginDto),
    );
  }

  @AllowAnonymous()
  @Version('1')
  @Post('/token')
  async token(@Body('refreshToken') refreshToken: string) {
    return this.authService.loginWithRefreshToken(refreshToken);
  }

  @Version('1')
  @Post('/token/introspect')
  async introspect(@Body() body: TokenDto) {
    return this.authService.introspectToken(body);
  }
}
