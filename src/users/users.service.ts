import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleValues } from '../roles/types/roles.type';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.isUserNotExist(createUserDto.email);
    const password = createUserDto.password;
    createUserDto.password = await UsersService.hashPassword(password);
    createUserDto.role_id = await this.getUserRoleId();

    return this.userRepository.save(createUserDto);
  }

  async isUserNotExist(email: string) {
    const user = this.findOne(email);

    if (user) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'Email is not available.',
      });
    }

    return true;
  }

  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(password, salt);
  }

  private async getUserRoleId(): Promise<number> {
    let userRole = await this.rolesService.findOne(RoleValues.USER);

    if (!userRole) {
      userRole = await this.rolesService.create({
        name: RoleValues.USER,
        description: 'Not verification user.',
      });
    }

    return userRole.id;
  }
}
