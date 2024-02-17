import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdatePriorityDto {
  @IsNumber()
  @IsNotEmpty()
  readonly priority!: number;
}
