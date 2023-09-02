import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  createBoard(title: string, userId: number) {
    const newBoard = this.boardRepository.create({ title, userId });
    return this.boardRepository.save(newBoard);
  }

  getBoards(userId: number) {
    return this.boardRepository.find({ where: { userId } });
  }

  getBoardById(id: number, userId: number) {
    return this.boardRepository.findOne({
      where: { id, userId },
      relations: ['tasks'],
    });
  }

  async updateBoard(id: number, title: string, userId: number) {
    const boardFound = await this.getBoardById(id, userId);
    boardFound.title = title;
    return this.boardRepository.save(boardFound);
  }

  async deleteBoard(id: number, userId: number) {
    try {
      const boardFound = await this.boardRepository.findOne({
        where: { id, userId },
        relations: ['tasks'],
      });

      return this.boardRepository.remove(boardFound);
    } catch (error) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
  }
}
