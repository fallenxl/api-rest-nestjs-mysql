import { Board } from '../board/board.entity';
export declare enum TaskStatus {
    ToDo = "To Do",
    InProgress = "In Progress",
    Done = "Done"
}
export declare class Task {
    id: number;
    title: string;
    status: TaskStatus;
    boardId: number;
    board: Board;
}
