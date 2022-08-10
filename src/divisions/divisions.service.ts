import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { DivisionEntity } from './entities/division.entity';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';

@Injectable()
export class DivisionsService {
  constructor(
    @InjectRepository(DivisionEntity)
    private divisionsRepository: Repository<DivisionEntity>,
  ) {}

  public async findAll(): Promise<DivisionEntity[]> {
    return this.divisionsRepository.find();
  }

  public async findOne(id: number): Promise<DivisionEntity> {
    return this.divisionsRepository.findOneBy({ id });
  }

  public async create(division: CreateDivisionDto): Promise<DivisionEntity> {
    const newDivision: DivisionEntity = this.divisionsRepository.create(division);
    return this.divisionsRepository.save(newDivision);
  }

  public async update(division: UpdateDivisionDto, id: number): Promise<DivisionEntity> {
    await this.divisionsRepository.update(id, division);
    return this.divisionsRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<{ data: string }> {
    const { affected }: DeleteResult = await this.divisionsRepository.delete(id);

    if (!affected) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Failed to delete division.',
      });
    }

    return { data: 'Division successful delete.' };
  }
}
