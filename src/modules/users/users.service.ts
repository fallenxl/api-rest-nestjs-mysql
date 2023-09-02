import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { validateUserDto } from './dto/validate-user.dto';
import * as bcrypt from 'bcrypt';
Repository;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async validateUser(user: validateUserDto) {
    try {
      const userFound = await this.userRepository.findOne({where: {email: user.email}});  
      if(!userFound) {
        throw new NotFoundException(`User with email ${user.email} not found`);
      }
  
      const isPasswordValid = bcrypt.compareSync(user.password, userFound.password);
      if(!isPasswordValid) {
        throw new NotFoundException('Invalid password');
      }
  
      return userFound;
    } catch (error) {
      throw new NotFoundException('User not found');
    }

  }


}
