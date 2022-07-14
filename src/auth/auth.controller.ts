import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('registration')
  registration(
    @Body() registrationUserDto: RegistrationUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.registration(registrationUserDto);
  }
}
