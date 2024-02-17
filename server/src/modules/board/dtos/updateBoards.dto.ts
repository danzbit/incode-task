import { PartialType } from "@nestjs/mapped-types";
import { CreateBoardDto } from "./createBoard.dto";

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
