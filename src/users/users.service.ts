import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
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
    await this.validateExistUser(createUserDto.email);

    const userRole = await this.rolesService.getUserRoleOrCreate();
    const hashPassword = await UsersService.hashPassword(
      createUserDto.password,
    );

    createUserDto.role_id = userRole.id;
    createUserDto.password = hashPassword;

    return this.userRepository.save(createUserDto);
  }

  async validateExistUser(email: string): Promise<boolean> {
    const user = await this.findOne(email);

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
}
