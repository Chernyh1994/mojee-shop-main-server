import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleType, RoleValues } from './types/roles.type';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findOne(name: RoleType): Promise<Role> {
    return this.roleRepository.findOneBy({ name });
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }

  async getUserRoleOrCreate(): Promise<Role> {
    let userRole = await this.findOne(RoleValues.USER);

    if (!userRole) {
      const createRoleDto: CreateRoleDto = {
        name: RoleValues.USER,
        description: 'Role for unverified user',
      };

      userRole = await this.create(createRoleDto);
    }

    return userRole;
  }
}
