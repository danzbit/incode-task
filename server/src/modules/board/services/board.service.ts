import { CreateBoardDto } from "../dtos/createBoard.dto";
import { IBoard } from "../interfaces";
import { BoardRepository } from "./../repositories/board.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getBoards(): Promise<IBoard[]> {
    return await this.boardRepository.getBoards();
  }

  async getBoardById(id: string): Promise<IBoard> {
    return await this.boardRepository.getBoardById(id);
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<IBoard> {
    return await this.boardRepository.createBoard(createBoardDto);
  }

  async updateBoard(boardId: string, updateBoardDto: CreateBoardDto): Promise<IBoard> {
    return await this.boardRepository.updateBoard(boardId, updateBoardDto);
  }

  async deleteBoard(id: string): Promise<IBoard> {
    return await this.boardRepository.deleteBoard(id);
  }
}
