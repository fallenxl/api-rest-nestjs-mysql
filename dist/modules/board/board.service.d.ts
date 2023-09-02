import { Repository } from 'typeorm';
import { Board } from './board.entity';
export declare class BoardService {
    private boardRepository;
    constructor(boardRepository: Repository<Board>);
    createBoard(title: string, userId: number): Promise<Board>;
    getBoards(userId: number): Promise<Board[]>;
    getBoardById(id: number, userId: number): Promise<Board>;
    updateBoard(id: number, title: string, userId: number): Promise<Board>;
    deleteBoard(id: number, userId: number): Promise<Board>;
}
