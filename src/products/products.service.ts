import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    return this.productsRepository.findOneBy({ id });
  }

  async create(createProductDto: any): Promise<ProductEntity[]> {
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  async update(updateProductDto: any, id: number): Promise<ProductEntity> {
    await this.productsRepository.update(id, updateProductDto);
    return this.productsRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<string> {
    await this.productsRepository.delete(id);
    return 'deleted successful.';
  }
}
