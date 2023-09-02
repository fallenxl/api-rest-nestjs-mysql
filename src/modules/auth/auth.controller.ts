import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard'; // Importa el guard de autenticación
import { AuthService } from './auth.service'; // Importa el servicio de autenticación
import { CredentialsDto } from './dto/credentials.dto'; // Importa el DTO de credenciales

@Controller('auth') // Controlador para las rutas relacionadas con la autenticación
export class AuthController {
  constructor(private authService: AuthService) {}

  // Ruta POST para iniciar sesión y obtener un token de acceso
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() credentials: CredentialsDto) {
    return this.authService.signIn(credentials);
  }

  // Ruta POST para registrarse y crear una cuenta
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() credentials: CredentialsDto) {
    return this.authService.signUp(credentials);
  }

  // Ruta GET para obtener el perfil del usuario autenticado utilizando el guard de autenticación
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Devuelve la información del usuario autenticado
  }
}
