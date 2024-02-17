import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCardDto {
  @IsNotEmpty({ message: "Field title cannot be empty." })
  @IsString()
  readonly title: string;

  @IsNotEmpty({ message: "Field description cannot be empty." })
  @IsString()
  readonly description: string;
}
