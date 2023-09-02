import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BoardService } from './board.service';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(private boardService: BoardService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createBoard(@Body('title') title: string, @Request() req) {
    return this.boardService.createBoard(title, req.user.sub);
  }

  @Get()
  getBoards(@Request() req) {
    return this.boardService.getBoards(req.user.sub);
  }

  @Get(':id')
  async getBoardById(@Request() req, @Param('id') id: string) {
    try {
      const boardFound = await this.boardService.getBoardById(
        +id,
        req.user.sub,
      );
      if (!boardFound) {
        throw new NotFoundException(`Board with ID "${id}" not found`);
      }
      return boardFound;
    } catch (error) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
  }

  @Put(':id')
  async updateBoard(
    @Request() req,
    @Param('id') id: string,
    @Body('title') title: string,
  ) {
    if (!title) {
      throw new NotFoundException(`Title is required`);
    }

    const boardFound = await this.boardService.getBoardById(+id, req.user.sub);
    if (!boardFound) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    return this.boardService.updateBoard(+id, title, req.user.sub);
  }

  @Delete(':id')
  async deleteBoard(@Request() req, @Param('id') id: string) {
    try {
      const boardFound = await this.boardService.getBoardById(
        +id,
        req.user.sub,
      );
      if (!boardFound) {
        throw new NotFoundException(`Board with ID "${id}" not found`);
      }
      return this.boardService.deleteBoard(+id, req.user.sub);
    } catch (error) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
  }
}
