import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('deberia iniciar sesion y retornar el token de acceso', async () => {
      const credentials: CredentialsDto = {
        username: 'testuser',
        password: 'testpassword',
      };

      const userFound = {
        id: 1,
        username: 'testuser',
        password: bcrypt.hashSync('testpassword', 10),
      };

      usersService.findByUsername = jest.fn().mockResolvedValue(userFound);
      bcrypt.compareSync = jest.fn().mockReturnValue(true);
      jwtService.signAsync = jest.fn().mockResolvedValue('testtoken');

      const result = await authService.signIn(credentials);

      expect(usersService.findByUsername).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        'testpassword',
        userFound.password
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: userFound.id,
        username: userFound.username,
      });
      expect(result).toEqual({ access_token: 'testtoken' });
    });

    it('deberia throw UnauthorizedException si las credentials son invalidas', async () => {
      const credentials: CredentialsDto = {
        username: 'testuser',
        password: 'testpassword',
      };

      usersService.findByUsername = jest.fn().mockResolvedValue(null);

      try {
        await authService.signIn(credentials);
      } catch (error) {
        expect(error.response.message).toBe('Invalid credentials');
      }
    });
  });

  describe('signUp', () => {
    it('deberia registrarse y retornar el token de acceso', async () => {
      const credentials: CredentialsDto = {
        username: 'testuser',
        password: 'testpassword',
      };

      const newUser = {
        id: 1,
        username: 'testuser',
        password: bcrypt.hashSync('testpassword', 10),
      };

      usersService.findByUsername = jest.fn().mockResolvedValue(null);
      usersService.createUser = jest.fn().mockResolvedValue(newUser);
      jwtService.signAsync = jest.fn().mockResolvedValue('testtoken');

      const result = await authService.signUp(credentials);

      expect(usersService.findByUsername).toHaveBeenCalledWith('testuser');
      expect(usersService.createUser).toHaveBeenCalledWith(credentials);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: newUser.id,
        username: newUser.username,
      });
      expect(result).toEqual({ access_token: 'testtoken' });
    });

    it('deberia throw UnauthorizedException si el username existe', async () => {
      const credentials: CredentialsDto = {
        username: 'testuser',
        password: 'testpassword',
      };

      usersService.findByUsername = jest.fn().mockResolvedValue({
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
      });

      try {
        await authService.signUp(credentials);
      } catch (error) {
        expect(error.response.message).toBe('Username already exists');
      }
    });
  });
});
