import { IBoard } from "./interfaces/index";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Board, BoardSchema } from "./db-schemas/board.db-schema";
import { BoardService } from "./services/board.service";
import { BoardRepository } from "./repositories/board.repository";
import { BoardController } from "./controllers/board.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }])],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
  exports: [BoardService, BoardRepository],
})
export class BoardModule {}
