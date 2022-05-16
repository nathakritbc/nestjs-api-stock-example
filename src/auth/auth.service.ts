import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { CreateRegisterDto } from './dto/create-Register.dto';
import { UpdateRegisterDto } from './dto/update-Register.dto';

import { CreateLoginDto } from './dto/create-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginData: CreateLoginDto) {
    const { email, password } = loginData;

    const user = await this.getAuthenticatedUser(email, password);
    if (user) {
      // console.log('user', user);
      const payload = { email: user.email, sub: user.id };
      // return user;
      return {
        email,
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  public async register(registrationData: CreateRegisterDto) {
    const { email, password } = registrationData;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    try {
      const createdUser = await this.usersService.create({
        email,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new BadRequestException('Wrong credentials provided');
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }
}
