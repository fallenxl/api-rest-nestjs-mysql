import { BoardService } from './board.service';
export declare class BoardController {
    private boardService;
    constructor(boardService: BoardService);
    createBoard(title: string, req: any): Promise<import("./board.entity").Board>;
    getBoards(req: any): Promise<import("./board.entity").Board[]>;
    getBoardById(req: any, id: string): Promise<import("./board.entity").Board>;
    updateBoard(req: any, id: string, title: string): Promise<import("./board.entity").Board>;
    deleteBoard(req: any, id: string): Promise<import("./board.entity").Board>;
}
