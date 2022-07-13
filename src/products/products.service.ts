import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOneBy({ id });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  async update(
    updateProductDto: UpdateProductDto,
    id: number,
  ): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    return this.productsRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<string> {
    await this.productsRepository.delete(id);
    return 'deleted successful.';
  }
}
