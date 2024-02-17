import { IsNotEmpty, IsString } from "class-validator";

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
