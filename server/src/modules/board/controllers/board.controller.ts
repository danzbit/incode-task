import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";
import { BoardService } from "../services/board.service";
import { CreateBoardDto } from "../dtos/createBoard.dto";
import { IBoard } from "../interfaces";

@Controller("boards")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getBoards(): Promise<IBoard[] | undefined> {
    return await this.boardService.getBoards();
  }

  @Get(":id")
  async getBoardById(@Param("id") id: string): Promise<IBoard | undefined> {
    return await this.boardService.getBoardById(id);
  }

  @Post()
  async createBoard(@Body() createBoard: CreateBoardDto): Promise<IBoard | undefined> {
    return await this.boardService.createBoard(createBoard);
  }

  @Put(":id")
  async updateBoard(@Param("id") boardId: string, @Body() updateBoardDto: CreateBoardDto): Promise<IBoard | undefined> {
    return await this.boardService.updateBoard(boardId, updateBoardDto);
  }

  @Delete(":id")
  async deleteBoard(@Param("id") id: string): Promise<IBoard | undefined> {
    return await this.boardService.deleteBoard(id);
  }
}
