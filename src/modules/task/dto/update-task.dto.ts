import { TaskStatus } from "../task.entity";

export class UpdateTaskDto {
    title: string;
    status: TaskStatus;
}