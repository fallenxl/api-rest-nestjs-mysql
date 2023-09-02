import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Importa el servicio de usuarios
import { JwtService } from '@nestjs/jwt'; // Importa el servicio JWT para trabajar con tokens
import { CredentialsDto } from './dto/credentials.dto'; // Importa el DTO de credenciales
import * as bcrypt from 'bcrypt'; // Importa la librería bcrypt para la verificación de contraseñas

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Inyecta el servicio de usuarios
    private jwtService: JwtService // Inyecta el servicio JWT
  ) {}

  // Método para iniciar sesión y generar un token de acceso
  async signIn(user: CredentialsDto) {
    // Busca un usuario por nombre de usuario
    const userFound = await this.usersService.findByUsername(user.username);

    // Verifica si el usuario existe
    if (!userFound) {
      throw new UnauthorizedException('Invalid credentials'); // Lanza una excepción si las credenciales son inválidas
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en forma segura
    const isPasswordValid = bcrypt.compareSync(
      user.password,
      userFound.password
    );

    // Verifica si la contraseña es válida
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials'); // Lanza una excepción si las credenciales son inválidas
    }

    // Crea un objeto de carga útil (payload) para el token JWT
    const payload = { sub: userFound.id, username: userFound.username };

    // Genera y firma un token JWT utilizando el servicio JWT
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Método para registrarse y generar un token de acceso
  async signUp(user: CredentialsDto) {
    // Busca un usuario por nombre de usuario para verificar si ya existe
    const userFound = await this.usersService.findByUsername(user.username);

    // Verifica si el usuario ya existe
    if (userFound) {
      throw new UnauthorizedException('Username already exists'); // Lanza una excepción si el nombre de usuario ya existe
    }

    // Crea un nuevo usuario utilizando el servicio de usuarios
    const newUser = await this.usersService.createUser(user);

    // Crea un objeto de carga útil (payload) para el token JWT
    const payload = { sub: newUser.id, username: newUser.username };

    // Genera y firma un token JWT utilizando el servicio JWT
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
