import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionsController } from './divisions.controller';
import { DivisionsService } from './divisions.service';
import { DivisionEntity } from './entities/division.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DivisionEntity])],
  controllers: [DivisionsController],
  providers: [DivisionsService],
})
export class DivisionsModule {}
