import { Board } from '../board/board.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    created_at: Date;
    usernameToLowerCase(): void;
    hashPassword(): void;
    boards: Board[];
}
