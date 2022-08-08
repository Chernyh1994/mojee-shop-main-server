import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    forwardRef(() => RolesModule),
    TypeOrmModule.forFeature([UserEntity, ProductEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
