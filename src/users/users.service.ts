import { BadRequestException, ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({ where: { is_deleted: false } });
  }

  public async findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id, is_deleted: false },
    });
  }

  public async create(user: CreateUserDto): Promise<{ data: string }> {
    await this.validateExistUser(user.email);
    user.password = await UsersService.hashPassword(user.password);
    const userEntity: UserEntity = await this.userRepository.create(user);
    await this.userRepository.save(userEntity);

    return { data: 'User successful create.' };
  }

  public async update(user: UpdateUserDto, id: number): Promise<{ data: string }> {
    await this.dataSource.transaction(async (manager) => {
      if (user.email) {
        await this.validateExistUser(user.email);
      }

      const userEntity: UserEntity = await manager.findOneByOrFail(UserEntity, { id });

      if (user.profile) {
        await manager.update(ProfileEntity, userEntity.profile.id, user.profile);
      }

      await manager.update(UserEntity, id, { email: user.email, role_id: user.role_id });
    });

    return { data: 'User successful update.' };
  }

  public async delete(id: number): Promise<{ data: string }> {
    const { affected }: UpdateResult = await this.userRepository.update(id, { is_deleted: true });

    if (!affected) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Failed to delete user.',
      });
    }

    return { data: 'User successful delete.' };
  }

  private async validateExistUser(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

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
