import { Module } from '@nestjs/common';
import { DivisionsController } from './divisions.controller';
import { DivisionsService } from './divisions.service';

@Module({
  controllers: [DivisionsController],
  providers: [DivisionsService]
})
export class DivisionsModule {}
