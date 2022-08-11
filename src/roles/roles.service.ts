import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  public async findAll(): Promise<RoleEntity[]> {
    return this.roleRepository.find();
  }

  public async findOneById(id: number): Promise<RoleEntity> {
    return this.roleRepository.findOneByOrFail({ id });
  }

  public async create(role: CreateRoleDto): Promise<RoleEntity> {
    const newRole = this.roleRepository.create(role);
    return this.roleRepository.save(newRole);
  }

  public async update(role: UpdateRoleDto, id: number) {
    const { affected }: UpdateResult = await this.roleRepository.update(id, role);

    if (!affected) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Failed to update role.',
      });
    }

    return { data: 'Role successful update.' };
  }
}
