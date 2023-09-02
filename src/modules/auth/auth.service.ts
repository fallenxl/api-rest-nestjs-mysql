import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(user : CredentialsDto) {
    const userFound = await this.usersService.findByUsername(user.username);
    if (!userFound) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compareSync(user.password, userFound.password);

    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: userFound.id, username: userFound.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp ( user : CredentialsDto) {
    const userFound = await this.usersService.findByUsername(user.username);
    if (userFound) {
        throw new UnauthorizedException('Username already exists');
    }
    const newUser = await this.usersService.createUser(user);
    const payload = { sub: newUser.id, username: newUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}