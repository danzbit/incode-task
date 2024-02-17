import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ColumnType } from "../enums";

export class UpdateColumnTypeAndPriorityDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly priority!: number;

  @IsEnum(ColumnType)
  @IsOptional()
  readonly columnType!: ColumnType;
}
