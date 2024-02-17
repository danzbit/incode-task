import { ObjectId } from "mongoose";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ColumnType } from "../enums";

export class CreateCardDto {
  @IsNotEmpty({ message: "Field title cannot be empty." })
  @IsString()
  readonly title: string;

  @IsNotEmpty({ message: "Field description cannot be empty." })
  @IsString()
  readonly description: string;

  @IsEnum(ColumnType)
  readonly columnType: ColumnType;

  @IsNotEmpty({ message: "Field priority cannot be empty." })
  @IsNumber()
  readonly priority: number;

  @IsNotEmpty({ message: "Field createdAt cannot be empty." })
  @IsDate()
  readonly createdAt: Date;

  @IsMongoId()
  readonly dashboard: string;
}
