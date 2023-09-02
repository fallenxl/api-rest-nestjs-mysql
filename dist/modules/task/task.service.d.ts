import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { BoardService } from '../board/board.service';
export declare class TaskService {
    private taskRepository;
    private boardService;
    constructor(taskRepository: Repository<Task>, boardService: BoardService);
    createTask(title: string, boardId: number, userId: number): Promise<Task>;
    getTasks(boardId: number, userId: number): Promise<Task[]>;
    getTaskById(id: number, boardId: number, userId: number): Promise<Task>;
    updateTask(id: number, task: UpdateTaskDto, boardId: number, userId: number): Promise<Task>;
    deleteTask(id: number, boardId: number, userId: number): Promise<Task>;
}
