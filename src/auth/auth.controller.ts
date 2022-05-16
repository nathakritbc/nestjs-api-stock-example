import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { AuthService } from './auth.service';

import { CreateRegisterDto } from './dto/create-Register.dto';
import { UpdateRegisterDto } from './dto/update-Register.dto';

import { CreateLoginDto } from './dto/create-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: CreateLoginDto) {
    return this.authService.login(loginData);
  }

  @Post('register')
  async register(@Body() registrationData: CreateRegisterDto) {
    return this.authService.register(registrationData);
  }
}
