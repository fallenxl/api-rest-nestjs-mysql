import { Body, Controller,Delete,Get,HttpCode,HttpStatus,Param,Post,Put,Request , UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BoardService } from './board.service';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardController {
    constructor(private boardService : BoardService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createBoard(@Body('title') title: string, @Request() req) {
        return this.boardService.createBoard(title, req.user.sub);
    }

    @Get()
    getBoards(@Request() req) {
        return this.boardService.getBoards(req.user.id);
    }

    @Get(':id')
    getBoardById(@Request() req, @Param('id') id : string) {
        return this.boardService.getBoardById(+id, req.user.sub);
    }

    @Put(':id')
    updateBoard(@Request() req, @Param('id') id : string, @Body('title') title: string) {
        return this.boardService.updateBoard(+id, title, req.user.sub);
    }
    @Delete(':id')
    deleteBoard(@Request() req, @Param('id') id : string) {
        return this.boardService.deleteBoard(+id, req.user.sub);
    }
}
