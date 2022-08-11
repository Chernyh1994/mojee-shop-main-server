import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { PriceEntity } from './entities/price.entity';
import { DetailEntity } from './entities/detail.entity';

@Injectable()
export class ProductsService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  public async findAll(): Promise<ProductEntity[]> {
    return this.productsRepository.find();
  }

  public async findOne(id: number): Promise<ProductEntity> {
    return this.productsRepository.findOneOrFail({ where: { id } });
  }

  public async create(product: CreateProductDto): Promise<{ data: string }> {
    const productEntity: ProductEntity = await this.productsRepository.create(product);
    await this.productsRepository.save(productEntity);

    return { data: 'Product successful create.' };
  }

  public async update(product: UpdateProductDto, id: number): Promise<{ data: string }> {
    await this.dataSource.transaction(async (manager) => {
      const productEntity: ProductEntity = await manager.findOneByOrFail(ProductEntity, { id });

      if (product.price) {
        await manager.update(PriceEntity, productEntity.price.id, product.price);
      }

      if (product.detail) {
        await manager.update(DetailEntity, productEntity.detail.id, product.detail);
      }

      await manager.update(ProductEntity, id, { name: product.name, category_id: product.category_id });
    });

    return { data: 'Product successful update.' };
  }

  public async delete(id: number): Promise<{ data: string }> {
    await this.dataSource.transaction(async (manager) => {
      const productEntity: ProductEntity = await manager.findOneByOrFail(ProductEntity, { id });
      await manager.delete(PriceEntity, productEntity.price.id);
      await manager.delete(DetailEntity, productEntity.detail.id);
      await manager.delete(ProductEntity, id);
    });

    return { data: 'Product successful delete.' };
  }
}
