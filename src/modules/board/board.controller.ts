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

@Controller('boards') // Controlador para las rutas relacionadas con los tableros
@UseGuards(AuthGuard) // Utiliza el guard de autenticación en todas las rutas de este controlador
export class BoardController {
  constructor(private boardService: BoardService) {}

  // Crea un nuevo tablero con un título proporcionado y el ID del usuario autenticado
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createBoard(@Body('title') title: string, @Request() req) {
    return this.boardService.createBoard(title, req.user.sub);
  }

  // Obtiene todos los tableros pertenecientes al usuario autenticado
  @Get()
  getBoards(@Request() req) {
    return this.boardService.getBoards(req.user.sub);
  }

  // Obtiene un tablero por su ID y el ID del usuario autenticado
  @Get(':id')
  async getBoardById(@Request() req, @Param('id') id: string) {
    return this.boardService.getBoardById(+id, req.user.sub);
  }

  // Actualiza un tablero por su ID y un nuevo título, verificando si el título se proporciona
  @Put(':id')
  async updateBoard(
    @Request() req,
    @Param('id') id: string,
    @Body('title') title: string,
  ) {
    if (!title) {
      throw new NotFoundException(`Title is required`);
    }

    return this.boardService.updateBoard(+id, title, req.user.sub);
  }

  // Elimina un tablero por su ID y el ID del usuario autenticado
  @Delete(':id')
  async deleteBoard(@Request() req, @Param('id') id: string) {
    return this.boardService.deleteBoard(+id, req.user.sub);
  }
}
