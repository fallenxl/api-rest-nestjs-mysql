import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

    createTask(title: string, boardId: number) {
        const newTask = this.taskRepository.create({ title, boardId });
        return this.taskRepository.save(newTask);
    }

    getTasks(boardId: number) {
        return this.taskRepository.find({ where: { boardId } });
    }

    getTaskById(id: number, boardId: number) {
        return this.taskRepository.findOne({ where: { id, boardId } });
    }

    async updateTask(id: number, task: UpdateTaskDto, boardId: number) {
        const taskFound = await this.getTaskById(id, boardId);
        taskFound.title = task.title;
        taskFound.status = task.status;
        return this.taskRepository.save(taskFound);
    }

    async deleteTask(id: number, boardId: number) {
        const taskFound = await this.getTaskById(id, boardId);
        return this.taskRepository.remove(taskFound);
    }

}
