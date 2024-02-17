import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Document, Schema as MongooseSchema, ObjectId } from "mongoose";

@Schema()
export class Board extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, unique: true, message: "Name must be unique" })
  name: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
