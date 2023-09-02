import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(Board),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(getRepositoryToken(Board));
  });

  describe('createBoard', () => {
    it('Deberia de crear una nuevo board ', async () => {
      const title = 'Test Board';
      const userId = 1;

      boardRepository.findOne = jest.fn().mockResolvedValue(null);
      boardRepository.create = jest.fn().mockReturnValue({ id: 1, title, userId });
      boardRepository.save = jest.fn().mockResolvedValue({ id: 1, title, userId });

      const result = await boardService.createBoard(title, userId);

      expect(boardRepository.findOne).toHaveBeenCalledWith({ where: { title, userId } });
      expect(boardRepository.create).toHaveBeenCalledWith({ title, userId });
      expect(boardRepository.save).toHaveBeenCalledWith({ id: 1, title, userId });
      expect(result).toEqual({ id: 1, title, userId });
    });

  });

});
