import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig, databaseConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        config.get<DataSourceOptions>('database'),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
