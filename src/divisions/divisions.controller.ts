import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../roles/decorators/roles.decorator';
import { RoleEnum } from '../roles/enums/role.enum';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';

@Controller('divisions')
export class DivisionsController {
  constructor(private divisionsService: DivisionsService) {}

  @Public()
  @Get()
  findAll() {
    return this.divisionsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.divisionsService.findOne(id);
  }

  @Post()
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDivisionDto: CreateDivisionDto) {
    return this.divisionsService.create(createDivisionDto);
  }

  @Put(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  update(@Body() updateDivisionDto: UpdateDivisionDto, @Param('id', ParseIntPipe) id: number) {
    return this.divisionsService.update(updateDivisionDto, id);
  }

  @Delete(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.divisionsService.delete(id);
  }
}
