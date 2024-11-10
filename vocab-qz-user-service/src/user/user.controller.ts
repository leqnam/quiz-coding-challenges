import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  Version,
} from '@nestjs/common';
import { UserSearchDto } from '@user/models/dto/userSearch.dto';
import { QueryTransformPipe } from '@utils/pipes/query-transform.pipe';
import { UserDto } from './models/dto/user.dto';
import { UserService } from './user.service';
import { AllowAnonymous } from '@auth/decorators/public.decorator';
import { UtilsService } from '@utils/services/utils.service';

@Controller('/account')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  @Get()
  @Version('1')
  async get(@Query(new QueryTransformPipe()) searchModel: UserSearchDto) {
    const result = await this.userService.query(searchModel);
    return result;
  }

  @Get('/:id')
  @Version('1')
  async findById(@Param('id') id: string): Promise<UserDto> {
    return new UserDto(
      UtilsService.cleanNullObject(
        await this.userService.getProfile({ id: id }),
      ),
    );
  }

  @Put()
  @Version('1')
  async updateUserProfile(@Body() body: UserDto) {
    const user = await this.userService.updateUser(body);
    return new UserDto(UtilsService.cleanNullObject(user));
  }

  @AllowAnonymous()
  @Post()
  @Version('1')
  async createUser(@Request() req, @Body() body: UserDto) {
    const user = await this.userService.createUser(body);
    return new UserDto(UtilsService.cleanNullObject(user));
  }

  @AllowAnonymous()
  @Delete('/logout')
  @Version('1')
  async logout(@Request() req) {
    const user = await this.userService.getMe(
      req.headers.authorization?.split(' ')[1],
    );
    await this.userService.logout(user);
    return {};
  }
}
