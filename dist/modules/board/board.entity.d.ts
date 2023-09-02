import { User } from '../users/users.entity';
import { Task } from '../task/task.entity';
export declare class Board {
    id: number;
    title: string;
    userId: number;
    user: User;
    tasks: Task[];
}
