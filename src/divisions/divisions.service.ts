import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DivisionEntity } from './entities/division.entity';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';

@Injectable()
export class DivisionsService {
  constructor(
    @InjectRepository(DivisionEntity)
    private divisionsRepository: Repository<DivisionEntity>,
  ) {}

  async findAll(): Promise<DivisionEntity[]> {
    return this.divisionsRepository.find();
  }

  async findOne(id: number): Promise<DivisionEntity> {
    return this.divisionsRepository.findOneBy({ id });
  }

  async create(division: CreateDivisionDto): Promise<DivisionEntity> {
    const newProduct: DivisionEntity = this.divisionsRepository.create(division);
    return this.divisionsRepository.save(newProduct);
  }

  async update(division: UpdateDivisionDto, id: number): Promise<DivisionEntity> {
    await this.divisionsRepository.update(id, division);
    return this.divisionsRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<string> {
    await this.divisionsRepository.delete(id);
    return 'deleted successful.';
  }
}
