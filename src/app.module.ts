import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { DivisionsModule } from './divisions/divisions.module';
import { ImagesModule } from './images/images.module';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import authConfig from '../config/auth.config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './roles/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig, databaseConfig, authConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get<DataSourceOptions>('database'),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    RolesModule,
    CategoriesModule,
    DivisionsModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
