import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../roles/decorators/roles.decorator';
import { RoleEnum } from '../roles/enums/role.enum';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  public findAll(): Promise<ProductEntity[]> {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    return this.productsService.findOne(id);
  }

  @Post()
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN, RoleEnum.MODERATOR)
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createProductDto: CreateProductDto): Promise<{ data: string }> {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN, RoleEnum.MODERATOR)
  public update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: string }> {
    return this.productsService.update(updateProductDto, id);
  }

  @Delete(':id')
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
