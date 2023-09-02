import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
export declare class TaskService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    createTask(title: string, boardId: number): Promise<Task>;
    getTasks(boardId: number): Promise<Task[]>;
    getTaskById(id: number, boardId: number): Promise<Task>;
    updateTask(id: number, task: UpdateTaskDto, boardId: number): Promise<Task>;
    deleteTask(id: number, boardId: number): Promise<Task>;
}
