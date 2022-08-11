import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';
import { PriceEntity } from './entities/price.entity';
import { DetailEntity } from './entities/detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, PriceEntity, DetailEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
