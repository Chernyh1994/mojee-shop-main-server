import { ForbiddenException, BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DivisionEntity } from '../divisions/entities/division.entity';
import { DivisionsService } from '../divisions/divisions.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
    private divisionsService: DivisionsService,
  ) {}

  public async findAll(): Promise<CategoryEntity[]> {
    return this.categoriesRepository.find();
  }

  public async findOne(id: number): Promise<CategoryEntity> {
    return this.categoriesRepository.findOneBy({ id });
  }

  public async create(category: CreateCategoryDto): Promise<CategoryEntity> {
    const division: DivisionEntity = await this.divisionsService.findOne(category.division_id);

    if (!division) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'Division not found.',
      });
    }

    const newCategory: CategoryEntity = this.categoriesRepository.create(category);
    return this.categoriesRepository.save(newCategory);
  }

  public async update(category: UpdateCategoryDto, id: number): Promise<CategoryEntity> {
    const division: DivisionEntity = await this.divisionsService.findOne(category.division_id);

    if (!division) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'Division not found.',
      });
    }

    await this.categoriesRepository.update(id, category);
    return this.categoriesRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<{ data: string }> {
    const { affected }: DeleteResult = await this.categoriesRepository.delete(id);

    if (!affected) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Failed to delete category.',
      });
    }

    return { data: 'Category successful delete.' };
  }
}
