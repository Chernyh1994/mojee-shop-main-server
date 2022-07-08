import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegistrationUserDto } from './dto/registration-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('registration')
  registration(@Body() registrationUserDto: RegistrationUserDto) {
    return this.authService.registration(registrationUserDto);
  }
}
