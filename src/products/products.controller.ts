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
import { RoleEnum } from '../roles/enums/role.enum';

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
  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN, RoleEnum.MODERATOR)
  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.update(updateProductDto, id);
  }

  @Roles(RoleEnum.OWNER, RoleEnum.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
