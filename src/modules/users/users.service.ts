import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity'; // Importa la entidad de usuario
import { CreateUserDto } from './dto/create-user.dto'; // Importa el DTO para crear usuarios

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // Inyecta el repositorio de usuarios
  ) {}

  // Método para crear un nuevo usuario a partir de los datos proporcionados en el DTO
  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user); // Crea una nueva instancia de usuario
    return this.userRepository.save(newUser); // Guarda el nuevo usuario en la base de datos
  }

  // Método para buscar un usuario por nombre de usuario
  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } }); // Busca un usuario por nombre de usuario en la base de datos
  }
}
