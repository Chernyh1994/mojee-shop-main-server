import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Roles } from '../roles/decorators/roles.decorator';
import { RoleEnum } from '../roles/enums/role.enum';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Post()
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createUserDto: CreateUserDto): Promise<{ data: string }> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: string }> {
    return this.usersService.update(updateUserDto, id);
  }

  @Post(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public delete(@Param('id', ParseIntPipe) id: number): Promise<{ data: string }> {
    return this.usersService.delete(id);
  }
}
