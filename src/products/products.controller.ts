import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../roles/decorators/roles.decorator';
import { RoleValues } from '../roles/types/roles.type';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @Roles(RoleValues.OWNER, RoleValues.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Roles(RoleValues.OWNER, RoleValues.ADMIN, RoleValues.MODERATOR)
  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.update(updateProductDto, id);
  }

  @Roles(RoleValues.OWNER)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
