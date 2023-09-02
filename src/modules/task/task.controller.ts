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
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task.entity';
@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTask(@Param('boardId') boardId: number, @Body('title') title: string) {
    return this.taskService.createTask(title, boardId);
  }

  @Get()
  getTasks(@Param('boardId') boardId: number) {
    return this.taskService.getTasks(boardId);
  }

  @Get(':id')
  getTaskById(@Param('id') id: number, @Param('boardId') boardId: number) {
    return this.taskService.getTaskById(id, boardId);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: number,
    @Param('boardId') boardId: number,
    @Body() task: UpdateTaskDto,
  ) {
    const { status } = task;
    if (status && !Object.values(TaskStatus).includes(status)) {
      throw new Error('Invalid status');
    }
    return this.taskService.updateTask(id, task, boardId);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number, @Param('boardId') boardId: number) {
    return this.taskService.deleteTask(id, boardId);
  }
}
