import { PartialType } from "@nestjs/mapped-types";
import { CreateCardDto } from "./createCard.dto";
import { ICard } from "../interfaces";

export class UpdateCardsDto {
  items: ICard[];
}
