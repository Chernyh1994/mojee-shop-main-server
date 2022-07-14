import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { RoleValues } from '../roles/types/roles.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(registrationUserDto: RegistrationUserDto) {
    const password = registrationUserDto.password;

    registrationUserDto.password = await AuthService.hashPassword(password);
    registrationUserDto.role_id = await this.getUserRoleId();

    const user = await this.usersService.create(registrationUserDto);
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(password, salt);
  }

  private async getUserRoleId(): Promise<number> {
    let userRole = await this.rolesService.findOne(RoleValues.USER);

    if (!userRole) {
      userRole = await this.rolesService.create({
        name: RoleValues.USER,
        description: 'Not verification user.',
      });
    }

    return userRole.id;
  }
}
