import { Schema as MongooseSchema } from "mongoose";
import { ColumnType } from "../enums";

export interface ICards {
  readonly title: string;
  readonly items: ICard[];
}

export interface ICard {
  title: string;
  description: string;
  columnType: ColumnType;
  priority: number;
  createdAt: Date;
  dashboard: string;
}
