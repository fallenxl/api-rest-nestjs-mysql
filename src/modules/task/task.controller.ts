import {
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
  Body,
  Post,
  Param,
  Get,
  Put,
  Delete,
  Request,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task.entity';

@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  // Crea una nueva tarea en un tablero específico
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTask(
    @Param('boardId') boardId: number, // Parámetro: ID del tablero al que se agregará la tarea
    @Body('title') title: string, // Cuerpo de la solicitud: título de la tarea
    @Request() req, // Objeto de solicitud que contiene información del usuario autenticado
  ) {
    return this.taskService.createTask(title, boardId, req.user.sub);
  }

  // Obtiene todas las tareas de un tablero específico
  @Get()
  getTasks(
    @Param('boardId') boardId: number, // Parámetro: ID del tablero del que se obtienen las tareas
    @Request() req, // Objeto de solicitud que contiene información del usuario autenticado
  ) {
    return this.taskService.getTasks(boardId, req.user.sub);
  }

  // Obtiene una tarea específica por su ID en un tablero específico
  @Get(':id')
  getTaskById(
    @Param('id') id: number, // Parámetro: ID de la tarea
    @Param('boardId') boardId: number, // Parámetro: ID del tablero al que pertenece la tarea
    @Request() req, // Objeto de solicitud que contiene información del usuario autenticado
  ) {
    return this.taskService.getTaskById(id, boardId, req.user.sub);
  }

  // Actualiza una tarea por su ID en un tablero específico
  @Put(':id')
  updateTask(
    @Param('id') id: number, // Parámetro: ID de la tarea a actualizar
    @Param('boardId') boardId: number, // Parámetro: ID del tablero al que pertenece la tarea
    @Body() task: UpdateTaskDto, // Cuerpo de la solicitud: datos de actualización de la tarea
    @Request() req, // Objeto de solicitud que contiene información del usuario autenticado
  ) {
    const { status } = task;
    if (status && !Object.values(TaskStatus).includes(status)) {
      throw new Error('Invalid status'); // Comprueba si el estado proporcionado es válido
    }
    return this.taskService.updateTask(id, task, boardId, req.user.sub);
  }

  // Elimina una tarea por su ID en un tablero específico
  @Delete(':id')
  deleteTask(
    @Param('id') id: number, // Parámetro: ID de la tarea a eliminar
    @Param('boardId') boardId: number, // Parámetro: ID del tablero al que pertenece la tarea
    @Request() req, // Objeto de solicitud que contiene información del usuario autenticado
  ) {
    return this.taskService.deleteTask(id, boardId, req.user.sub);
  }
}
