import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { RolesGuard } from './guards/roles.guard';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    RolesService,
  ],
  imports: [UsersModule, TypeOrmModule.forFeature([Role])],
  exports: [RolesService],
})
export class RolesModule {}