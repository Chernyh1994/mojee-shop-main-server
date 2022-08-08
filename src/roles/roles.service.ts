import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEnum } from './enums/role.enum';
import { RoleType } from './types/role.type';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findOne(name: RoleType): Promise<RoleEntity> {
    return this.roleRepository.findOneBy({ name });
  }

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }

  async getUserRoleOrCreate(): Promise<RoleEntity> {
    let userRole = await this.findOne(RoleEnum.USER);

    if (!userRole) {
      const createRoleDto: CreateRoleDto = {
        name: RoleEnum.USER,
        description: 'Role for unverified user',
      };

      userRole = await this.create(createRoleDto);
    }

    return userRole;
  }
}
