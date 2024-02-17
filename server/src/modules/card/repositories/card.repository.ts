import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Card } from "../db-schemas/card.db-schema";
import { Model, Types } from "mongoose";
import { ICard, ICards } from "../interfaces";
import { CreateCardDto } from "../dtos/createCard.dto";
import { UpdateCardDto } from "../dtos/updateCard.dto";
import { UpdatePriorityDto } from "../dtos/updatePriority.dto";
import { UpdateColumnTypeAndPriorityDto } from "../dtos/updateColumnTypeAndPriority.dto";
import { ColumnType } from "../enums";
import { UpdateCardsDto } from "../dtos/updateCardsDto";

@Injectable()
export class CardRepository {
  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<ICard>,
  ) {}

  async getAll(): Promise<ICards[]> {
    const cardsArr = [];
    const cards = await this.cardModel.find().exec();
    const columnTypes: ColumnType[] = [ColumnType.TODO, ColumnType.INPROGRESS, ColumnType.DONE];
    for (let type of columnTypes) {
      const arr = [];
      for (let card of cards) {
        if (type == card.columnType) {
          arr.push(card);
        }
      }
      cardsArr.push({
        title: type,
        items: arr.sort((a: ICard, b: ICard): number => a.priority - b.priority),
      });
    }

    return cardsArr;
  }

  async getAllByBoardId(boardId: string): Promise<ICards[]> {
    const cardsArr = [];
    const cards = await this.cardModel.find({ dashboard: boardId }).exec();
    const columnTypes: ColumnType[] = [ColumnType.TODO, ColumnType.INPROGRESS, ColumnType.DONE];
    for (let type of columnTypes) {
      const arr = [];
      for (let card of cards) {
        if (type == card.columnType) {
          arr.push(card);
        }
      }
      cardsArr.push({
        title: type,
        items: arr.sort((a: ICard, b: ICard): number => a.priority - b.priority),
      });
    }

    return cardsArr;
  }

  async getAllByIdAndType(boardId: string, columnType: ColumnType): Promise<ICard[]> {
    return await this.cardModel.find({ dashboard: boardId, columnType }).sort({ priority: "asc" }).exec();
  }

  async createCard(createCardDto: CreateCardDto): Promise<ICard> {
    const card = await this.cardModel.find({ title: createCardDto.title });

    if (card.length !== 0) {
      throw new ConflictException("Card already exists!");
    }

    const newCard = new this.cardModel(createCardDto);
    return await newCard.save();
  }

  async updateCard(cardTitle: string, updateCardDto: UpdateCardDto): Promise<ICard> {
    const existingCard = await this.cardModel.findOne({ title: cardTitle });

    if (!existingCard) {
      throw new NotFoundException("The card with this title does not exist");
    }

    existingCard.title = updateCardDto.title || existingCard.title;
    existingCard.description = updateCardDto.description || existingCard.description;

    return existingCard.save();
  }

  async updateCards(type: ColumnType, updateCardsDto: UpdateCardsDto): Promise<ICard[]> {
    const updatedCards = [];
    for (let i = 0; i < updateCardsDto.items.length; i++) {
      const card = await this.cardModel.findOne({ title: updateCardsDto.items[i].title });

      card.priority = i + 1;
      card.columnType = card.columnType == type ? card.columnType : type;

      card.save();

      updatedCards.push(card);
    }

    return updatedCards;
  }

  async updatePriority(cardId: string, updatePriorityDto: UpdatePriorityDto): Promise<ICard> {
    const existingCard = await this.cardModel.findById(cardId);

    if (!existingCard) {
      throw new NotFoundException("The card with this id does not exist");
    }
    existingCard.priority = updatePriorityDto.priority;

    return existingCard.save();
  }

  async updateColumnTypeAndPriority(cardId: string, updateColumnTypePriorityDto: UpdateColumnTypeAndPriorityDto): Promise<ICard> {
    const existingCard = await this.cardModel.findById(cardId);

    if (!existingCard) {
      throw new NotFoundException("The card with this id does not exist");
    }

    existingCard.priority = updateColumnTypePriorityDto.priority || existingCard.priority;
    existingCard.columnType = updateColumnTypePriorityDto.columnType || existingCard.columnType;

    return existingCard.save();
  }

  async deleteCard(cardId: string): Promise<ICard> {
    const deletedCard = await this.cardModel.findByIdAndDelete(cardId);

    if (!deletedCard) {
      throw new NotFoundException("The card with this id does not exist");
    }

    return deletedCard;
  }
}
