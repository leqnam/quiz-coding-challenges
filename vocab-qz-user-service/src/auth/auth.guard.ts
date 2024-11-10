import { ALLOW_ANONYMOUS_META_KEY } from '@auth/decorators/public.decorator';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { Request } from 'express';
import { AuthService } from '@auth/auth.service';
// import { Roles } from '@auth/decorators/roles.decorator';
import { Token } from '@auth/interfaces/token';
import { UserProfileDto } from '@user/models/dto/userProfile.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      ALLOW_ANONYMOUS_META_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const decoded = this.jwtService.decode(token);
    if (!decoded) {
      throw new UnauthorizedException('token_not_valid');
    }
    const tm = { id: decoded.id, mobile: decoded.mobile };
    try {
      const userProfile = new UserProfileDto(
        await this.userService.getProfile(tm),
      );

      if (userProfile.isActive === false) {
        throw new ForbiddenException('account_not_actived');
      }

      await this.jwtService.verifyAsync<Token>(
        token,
        this.authService.getAccessTokenOptions(userProfile),
      );

      // Check roles
      // const roles = this.reflector.get(Roles, context.getHandler());
      // if (!roles) {
      //   return true;
      // }

      // const hasRole = () =>
      //   userProfile?.roles?.some(
      //     (role: string) => !!roles.find(item => item === role),
      //   );

      // const hasRole = () =>
      //   !!roles.find(item => item === userProfile?.roleName);

      return true; //userProfile && !userProfile?.roleName && !hasRole();
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
