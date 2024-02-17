import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Board } from "../db-schemas/board.db-schema";
import { Model } from "mongoose";
import { CreateBoardDto } from "../dtos/createBoard.dto";
import { IBoard } from "../interfaces";
import { UpdateBoardDto } from "../dtos/updateBoards.dto";

@Injectable()
export class BoardRepository {
  constructor(
    @InjectModel(Board.name)
    private readonly boardModel: Model<IBoard>,
  ) {}

  async getBoards(): Promise<IBoard[]> {
    return await this.boardModel.find().exec();
  }

  async getBoardById(id: string): Promise<IBoard> {
    const board = await this.boardModel.findById(id).exec();

    if (!board) {
      throw new NotFoundException("The board with this id does not exist");
    }

    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<IBoard> {
    const board = await this.boardModel.find({ name: createBoardDto.name });

    if (board.length !== 0) {
      throw new ConflictException("Board already exists!");
    }

    const newBoard = new this.boardModel(createBoardDto);
    return await newBoard.save();
  }

  async updateBoard(boardId: string, updateBoardDto: UpdateBoardDto): Promise<IBoard> {
    const existingBoard = await this.boardModel.findByIdAndUpdate(boardId, updateBoardDto, { new: true });

    if (!existingBoard) {
      throw new NotFoundException("The board with this id does not exist");
    }
    return existingBoard;
  }

  async deleteBoard(id: string): Promise<IBoard> {
    const deletedBoard = await this.boardModel.findByIdAndDelete(id);

    if (!deletedBoard) {
      throw new NotFoundException("The board with this id does not exist");
    }

    return deletedBoard;
  }
}
