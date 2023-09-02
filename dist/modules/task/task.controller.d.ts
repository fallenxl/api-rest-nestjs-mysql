import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    createTask(boardId: number, title: string, req: any): Promise<import("./task.entity").Task>;
    getTasks(boardId: number, req: any): Promise<import("./task.entity").Task[]>;
    getTaskById(id: number, boardId: number, req: any): Promise<import("./task.entity").Task>;
    updateTask(id: number, boardId: number, task: UpdateTaskDto, req: any): Promise<import("./task.entity").Task>;
    deleteTask(id: number, boardId: number, req: any): Promise<import("./task.entity").Task>;
}
