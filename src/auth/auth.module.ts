import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secretOrPrivateKey: config.get<string>('auth.jwtSecret'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AuthModule {}
