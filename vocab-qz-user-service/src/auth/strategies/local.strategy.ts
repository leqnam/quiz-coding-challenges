import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@auth/auth.service';
import { UserDto } from '@user/models/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(_: UserDto): Promise<any> {
    const __ = await this.authService.validateUser(_);
    if (!__) {
      throw new UnauthorizedException();
    }
    return __;
  }
}
