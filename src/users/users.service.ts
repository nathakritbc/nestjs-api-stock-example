import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new NotFoundException('User with this email does not exist');
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  // create(createUserDto: CreateUserDto): Promise<User> {
  //   try {
  //     return this.userRepository.save(createUserDto);
  //   } catch (err) {
  //     return err;
  //   }
  // }

  findAll(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (err) {
      return err;
    }
  }

  findOne(username: string): Promise<User> {
    try {
      return this.userRepository.findOne(username);
    } catch (err) {
      return err;
    }
  }

  // async update(id: number, userRepository: UpdateUserDto): Promise<User> {
  //   try {
  //     const user = await this.userRepository.findOne(id);
  //     const updateUser = Object.assign(user, userRepository);
  //     if (!user) {
  //       throw new NotFoundException('Note is not found');
  //     }
  //     return await this.userRepository.save(updateUser);
  //   } catch (err) {
  //     return err;
  //   }
  // }

  // async remove(id: number): Promise<string> {
  //   try {
  //     const admin = await this.userRepository.findOne(id);
  //     if (!admin) {
  //       throw new NotFoundException('Note is not found');
  //     }
  //     await this.userRepository.delete(id);
  //     return `Record deleted successfully`;
  //   } catch (err) {
  //     return err;
  //   }
  // }
}
