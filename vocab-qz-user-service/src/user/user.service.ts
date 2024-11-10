import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQueryDto } from '@user/models/dto/userQueryDto';
import { UserSearchDto } from '@user/models/dto/userSearch.dto';
import { environment } from '@utils/constants';
import { SearchResultDto } from '@utils/models/dtos/search-result.dto';
import { SearchService } from '@utils/services/search.service';
import { UtilsService } from '@utils/services/utils.service';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { UserDto } from '@user/models/dto/user.dto';
import { User } from '@user/models/entities/user.entity';
import { cleanNullObject, isNullable } from '@utils/helper';
import { UserProfileDto } from '@user/models/dto/userProfile.dto';

@Injectable()
export class UserService extends SearchService<User, UserSearchDto> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    @InjectMapper() private mapper: Mapper,
  ) {
    super(userRepository);
  }

  protected queryBuilder(model: UserSearchDto): FindOptionsWhere<User> {
    const queryable = {} as FindOptionsWhere<User>;
    if (model.q) {
      if (model.exact) {
        queryable.mobile = model.q;
      } else {
        queryable.mobile = Like(`%${model.q}%`);
      }
    }
    return queryable;
  }

  public async query(model: UserSearchDto) {
    const res = await this.paginate(model);
    return new SearchResultDto<UserQueryDto>(
      res.pageMeta,
      this.mapper.mapArray(res.data, User, UserQueryDto),
    );
  }

  public async createUser(dto: UserDto): Promise<UserDto> {
    if (await this.findByMobile(dto.mobile))
      throw new ConflictException('user_existed');
    try {
      delete dto.id;
      delete dto.createDate;
      delete dto.effectDate;
      delete dto.dateLastMaint;
      delete dto.inactiveDate;
      delete dto.deletedBy;
      const userTmp = cleanNullObject(dto);
      const user = this.userRepository.create(userTmp);
      if (isNullable(user.password)) {
        const dateInstance = user.dob ? new Date(user.dob) : new Date();
        user.password = `${dateInstance.getDate() < 10 ? '0' + dateInstance.getDate() : dateInstance.getDate()}`;
        user.password += `${dateInstance.getMonth() + 1 < 10 ? '0' + (dateInstance.getMonth() + 1) : dateInstance.getMonth() + 1}`;
        user.password += `${dateInstance.getFullYear()}`;
        user.note = user.password;
      }
      await this.userRepository.save(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, sessionToken, ...result } = userTmp;
      return result as UserDto;
    } catch (error) {
      throw new BadRequestException(
        `An internal error has occurred. ${
          environment.env != 'production' && error.toString()
        }`,
      );
    }
  }

  public async logout(dto: UserDto): Promise<UserDto> {
    if (!dto.sessionToken) throw new ForbiddenException('already_log_out');
    try {
      dto.sessionToken = '';
      return await this.updateUser(dto);
      // await this.subscriptionService.deleteAll(dto);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  public async updateMe(user: UserDto, body: UserDto): Promise<UserDto> {
    try {
      user = UtilsService.mergeObject(user, body);
      return await this.updateUser(user);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  async updateUser(dto: UserDto): Promise<UserDto> {
    if (!dto) {
      throw new BadRequestException('Missing data');
    }
    if (!dto.id) throw new BadRequestException('Missing id');
    const user = await this.findById(dto.id);
    if (!user) throw new NotFoundException('user not existed');
    delete dto.id;
    const merged = UtilsService.mergeObject(user, dto);

    try {
      delete merged.createDate;
      delete merged.dateLastMaint;
      const rt = await this.userRepository.save(merged);
      return rt;
    } catch (error) {
      throw new BadRequestException('An internal error has occurred.' + error);
    }
  }

  public async findById(id: string): Promise<User> {
    const dto = {
      id: id,
    } as User;
    return await this.getUser(dto);
  }

  public async findByMobile(mobile: string): Promise<UserProfileDto> {
    const dto = {
      mobile: mobile,
    } as User;
    const me = await this.getUser(dto);
    if (!me) return null;
    delete me.sessionToken;
    return new UserProfileDto(me);
  }

  // Use for get access_token, get refresh_token, get me
  public async getMe(token: string) {
    const decoded = this.jwtService.decode(token);
    const dto = {
      id: decoded.id,
      mobile: decoded.mobile,
    } as User;
    const me = await this.getProfile(dto);
    return new UserProfileDto(me);
  }

  public async getProfile(dto: UserProfileDto) {
    const profile = await this.getUser(dto);
    if (!profile) throw new NotFoundException('User not existed');
    delete profile.note;
    return profile;
  }

  private async getUser(dto: UserProfileDto): Promise<any> {
    const user = this.userRepository.createQueryBuilder('user');
    user
      .select('user.email', 'email')
      .addSelect('user.id', 'id')
      .addSelect('user.name', 'name')
      .addSelect('user.password', 'password')
      .addSelect('user.mobile', 'mobile')
      .addSelect('user.note', 'note')
      .addSelect('user.sessionToken', 'sessionToken')
      .addSelect('user.createDate', 'createDate')
      .addSelect('user.effectDate', 'effectDate')
      .addSelect('user.inactiveDate', 'inactiveDate')
      .addSelect('user.dateLastMaint', 'dateLastMaint')
      .addSelect('user.status', 'status');
    if (dto?.mobile) {
      user.where('user.mobile = :mobile', {
        mobile: dto?.mobile,
      });
    }
    if (dto?.id) {
      user.where('user.id = :uid', { uid: dto?.id });
    }
    return await user.getRawOne();
  }
}
