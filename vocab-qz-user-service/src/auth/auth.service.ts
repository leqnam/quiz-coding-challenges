import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { environment, jwtConstants } from '@utils/constants';
import { UtilsService } from '@utils/services/utils.service';
import { Token } from './interfaces/token';
import { TokenDto } from './interfaces/token.dto';
import { UserDto } from '@user/models/dto/user.dto';
import { UserProfileDto } from '@user/models/dto/userProfile.dto';
import { randomString } from '@utils/helper';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // async loginOAuth(staff: Staff) {
  //   const payload = { username: staff.staffMobile, sub: staff.staffId }; // Adjust as per your user schema
  //   return {
  //     accessToken: this.jwtService.sign(payload),
  //   };
  // }

  public async token(_: UserDto): Promise<any> {
    const payload: Token = {
      sub: _.id,
      id: _.id,
      mobile: _.mobile,
      iss: environment.host,
      scope: [],
    };
    let refreshToken: string;

    if (jwtConstants.expiresIn) {
      refreshToken = await this.jwtService.signAsync(
        payload,
        this.getRefreshTokenOptions(_),
      );
    }
    const accessToken = await this.jwtService.signAsync(
      payload,
      this.getAccessTokenOptions(_),
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  public async loginWithRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.decode(refreshToken);
      if (!decoded) {
        throw new UnauthorizedException();
      }

      const userProfile = new UserProfileDto(
        await this.userService.getProfile({
          mobile: decoded.mobile,
        }),
      );

      if (!userProfile.isActive) {
        throw new ForbiddenException('account_not_actived');
      }

      try {
        await this.jwtService.verifyAsync<Token>(
          refreshToken,
          this.getRefreshTokenOptions(userProfile),
          //secret: jwtConstants.secret,
        );
        return this.token(userProfile);
      } catch (error) {
        console.log('loginWithRefreshToken verifyAsync: ', error);
        throw new ForbiddenException('refreshtoken_is_invalid_or_expired');
      }
    } catch (e) {
      console.log('loginWithRefreshToken : ', e);
      throw new UnauthorizedException(e.message);
    }
  }

  public async introspectToken(body: TokenDto) {
    const { accessToken } = body;
    try {
      const decoded = this.jwtService.decode(accessToken);
      if (!decoded) {
        throw new UnauthorizedException();
      }
      const userProfile = new UserProfileDto(
        await this.userService.getProfile({
          mobile: decoded.mobile,
        }),
      );

      if (!userProfile.isActive) {
        throw new ForbiddenException('account_not_actived');
      }

      try {
        await this.jwtService.verifyAsync<Token>(
          accessToken,
          this.getAccessTokenOptions(userProfile),
        );
        return { active: true };
      } catch (error) {
        console.log(error);
        return { active: true };
      }
    } catch (e) {
      console.log('introspectToken : ', e);
      throw new ForbiddenException('refreshtoken_is_invalid_or_expired');
    }
  }

  public async validateUser(dto: UserDto): Promise<UserProfileDto> {
    // To-do create PINCode
    const { mobile, password } = dto;
    if (!mobile) {
      throw new BadRequestException('mobile_mandatory');
    }
    if (!password) {
      throw new BadRequestException('password_mandatory');
    }
    const userProfile = new UserProfileDto(
      await this.userService.findByMobile(mobile),
    );
    if (!userProfile) {
      throw new NotFoundException('account_not_existed');
    }
    if (!(await UtilsService.validateHash(password, userProfile.password))) {
      throw new UnauthorizedException('invalid_credentials');
    }
    if (userProfile.isActive === false) {
      throw new ForbiddenException('account_not_actived');
    }
    try {
      userProfile.sessionToken = randomString(60);
      delete userProfile.note;
      return await this.userService.updateUser(userProfile);
    } catch (e) {
      console.log('error login validateUser ' + e);
      throw new ForbiddenException('account_not_actived');
    }
  }

  public getRefreshTokenOptions(user: UserDto): JwtSignOptions {
    return this.getTokenOptions('refresh', user);
  }

  public getAccessTokenOptions(user: UserDto): JwtSignOptions {
    return this.getTokenOptions('access', user);
  }

  private getTokenOptions(type: 'refresh' | 'access', user: UserDto) {
    const options: JwtSignOptions = {
      secret: jwtConstants[type + 'TokenSecret'] + user.sessionToken,
    };

    const expiration = jwtConstants[type + 'TokenExpiration'];

    if (expiration) {
      options.expiresIn = expiration;
    }

    return options;
  }
}
