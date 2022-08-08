import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ImageEntity } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
