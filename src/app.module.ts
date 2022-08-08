import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthorizationsModule } from './authorizations/authorizations.module';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { DivisionsModule } from './divisions/divisions.module';
import { ImagesModule } from './images/images.module';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import authConfig from '../config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig, databaseConfig, authConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        config.get<DataSourceOptions>('database'),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthorizationsModule,
    ProductsModule,
    RolesModule,
    CategoriesModule,
    DivisionsModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
