import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  // Crea un nuevo tablero con un título específico y un ID de usuario
  async createBoard(title: string, userId: number) {
    // Verifica si un tablero con el mismo título ya existe para el usuario
    const boardFound = await this.getBoardByTitle(title, userId);
    if (boardFound) {
      throw new HttpException(
        `Board with title "${title}" already exists`,
        HttpStatus.CONFLICT,
      );
    }

    // Crea un nuevo tablero y lo guarda en la base de datos
    const board = this.boardRepository.create({ title, userId });
    return this.boardRepository.save(board);
  }

  // Busca un tablero por su título y el ID de usuario
  getBoardByTitle(title: string, userId: number) {
    return this.boardRepository.findOne({ where: { title, userId } });
  }

  // Obtiene todos los tableros pertenecientes a un usuario específico
  getBoards(userId: number) {
    return this.boardRepository.find({ where: { userId } });
  }

  // Obtiene un tablero por su ID y el ID de usuario
  getBoardById(id: number, userId: number) {
    const boardFound = this.boardRepository.findOne({
      where: { id, userId },
    });

    return boardFound;
  }

  // Actualiza un tablero por su ID y un nuevo título, verificando conflictos de título
  async updateBoard(id: number, title: string, userId: number) {
    // Obtiene el tablero por su ID y usuario
    const boardFound = await this.getBoardById(id, userId);
    if (!boardFound) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    // Verifica si un tablero con el mismo título ya existe para el usuario
    const boardWithTitle = await this.getBoardByTitle(title, userId);
    if (boardWithTitle) {
      throw new HttpException(
        `Board with title "${title}" already exists`,
        HttpStatus.CONFLICT,
      );
    }

    // Actualiza el título del tablero y lo guarda en la base de datos
    boardFound.title = title;
    return this.boardRepository.save(boardFound);
  }

  // Elimina un tablero por su ID y usuario
  async deleteBoard(id: number, userId: number) {
    // Obtiene el tablero por su ID y usuario
    const boardFound = await this.getBoardById(id, userId);
    if (!boardFound) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    // Elimina el tablero de la base de datos
    return this.boardRepository.remove(boardFound);
  }
}
