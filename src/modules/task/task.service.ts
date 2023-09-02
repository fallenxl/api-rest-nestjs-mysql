import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { BoardService } from '../board/board.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private boardService: BoardService,
  ) {}

  // Crea una nueva tarea en un tablero específico y verifica si el tablero existe
  async createTask(title: string, boardId: number, userId: number) {
    const board = await this.boardService.getBoardById(boardId, userId);
    if (!board) {
      throw new NotFoundException(`Board with ID "${boardId}" not found`);
    }
    const task = this.taskRepository.create({ title, boardId });
    return this.taskRepository.save(task);
  }

  // Obtiene todas las tareas de un tablero específico y verifica si el tablero existe
  async getTasks(boardId: number, userId: number) {
    const board = await this.boardService.getBoardById(boardId, userId);
    if (!board) {
      throw new NotFoundException(`Board with ID "${boardId}" not found`);
    }
    return this.taskRepository.find({ where: { boardId } });
  }

  // Obtiene una tarea específica por su ID y verifica si tanto el tablero como la tarea existen
  async getTaskById(id: number, boardId: number, userId: number) {
    const board = await this.boardService.getBoardById(boardId, userId);
    if (!board) {
      throw new NotFoundException(`Board with ID "${boardId}" not found`);
    }
    const taskFound = await this.taskRepository.findOne({
      where: { id, boardId },
    });
    if (!taskFound) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return taskFound;
  }

  // Actualiza una tarea por su ID, verifica si el tablero y la tarea existen y realiza la actualización
  async updateTask(id: number, task: UpdateTaskDto, boardId: number, userId: number) {
    const taskFound = await this.getTaskById(id, boardId, userId);
    taskFound.title = task.title;
    taskFound.status = task.status;
    return this.taskRepository.save(taskFound);
  }

  // Elimina una tarea por su ID, verifica si el tablero y la tarea existen y realiza la eliminación
  async deleteTask(id: number, boardId: number, userId: number) {
    const taskFound = await this.getTaskById(id, boardId, userId);
    if (!taskFound) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return this.taskRepository.remove(taskFound);
  }
}
