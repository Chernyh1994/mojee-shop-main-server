import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../roles/decorators/roles.decorator';
import { RoleEnum } from '../roles/enums/role.enum';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';
import { DivisionEntity } from './entities/division.entity';

@Controller('divisions')
export class DivisionsController {
  constructor(private divisionsService: DivisionsService) {}

  @Public()
  @Get()
  public findAll(): Promise<DivisionEntity[]> {
    return this.divisionsService.findAll();
  }

  @Public()
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<DivisionEntity> {
    return this.divisionsService.findOne(id);
  }

  @Post()
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createDivisionDto: CreateDivisionDto): Promise<{ data: string }> {
    return this.divisionsService.create(createDivisionDto);
  }

  @Put(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public update(
    @Body() updateDivisionDto: UpdateDivisionDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: string }> {
    return this.divisionsService.update(updateDivisionDto, id);
  }

  @Delete(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public delete(@Param('id', ParseIntPipe) id: number): Promise<{ data: string }> {
    return this.divisionsService.delete(id);
  }
}
