import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    createTask(boardId: number, title: string): Promise<import("./task.entity").Task>;
    getTasks(boardId: number): Promise<import("./task.entity").Task[]>;
    getTaskById(id: number, boardId: number): Promise<import("./task.entity").Task>;
    updateTask(id: number, boardId: number, task: UpdateTaskDto): Promise<import("./task.entity").Task>;
    deleteTask(id: number, boardId: number): Promise<import("./task.entity").Task>;
}
