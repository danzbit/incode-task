import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Document, Schema as MongooseSchema, ObjectId } from "mongoose";
import { Board } from "src/modules/board/db-schemas/board.db-schema";
import { ColumnType } from "../enums";

@Schema()
export class Card extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ColumnType })
  columnType: ColumnType;

  @Prop({ required: true })
  priority: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Board.name })
  dashboard: Board;
}

export const CardSchema = SchemaFactory.createForClass(Card);
