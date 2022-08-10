import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../roles/decorators/roles.decorator';
import { RoleEnum } from '../roles/enums/role.enum';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Public()
  @Get()
  public findAll(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoryEntity> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryEntity> {
    return this.categoriesService.update(updateCategoryDto, id);
  }

  @Delete(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public delete(@Param('id', ParseIntPipe) id: number): Promise<{ data: string }> {
    return this.categoriesService.delete(id);
  }
}
