import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { RoleEnum } from './enums/role.enum';
import { RolesService } from './roles.service';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public findAll(): Promise<RoleEntity[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<RoleEntity> {
    return this.rolesService.findOneById(id);
  }

  @Post()
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.rolesService.create(createRoleDto);
  }

  @Put(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public update(
    @Body() updateRoleDto: UpdateRoleDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: string }> {
    return this.rolesService.update(updateRoleDto, id);
  }
}
