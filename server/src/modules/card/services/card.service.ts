import { Injectable } from "@nestjs/common";
import { CardRepository } from "../repositories/card.repository";
import { ICards, ICard } from "../interfaces";
import { CreateCardDto } from "../dtos/createCard.dto";
import { UpdateCardDto } from "../dtos/updateCard.dto";
import { UpdatePriorityDto } from "../dtos/updatePriority.dto";
import { UpdateColumnTypeAndPriorityDto } from "../dtos/updateColumnTypeAndPriority.dto";
import { ColumnType } from "../enums";
import { UpdateCardsDto } from "../dtos/updateCardsDto";

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  async getAll(): Promise<ICards[]> {
    return await this.cardRepository.getAll();
  }
  async getAllByBoardId(boardId: string): Promise<ICards[]> {
    return await this.cardRepository.getAllByBoardId(boardId);
  }
  async getAllByIdAndType(boardId: string, columnType: ColumnType): Promise<ICard[]> {
    return await this.cardRepository.getAllByIdAndType(boardId, columnType);
  }
  async createCard(createCardDto: CreateCardDto): Promise<ICard> {
    return await this.cardRepository.createCard(createCardDto);
  }
  async updateCard(cardTitle: string, updateCardDto: UpdateCardDto): Promise<ICard> {
    return await this.cardRepository.updateCard(cardTitle, updateCardDto);
  }
  async updateCards(type: ColumnType, updateCardsDto: UpdateCardsDto): Promise<ICard[]> {
    return await this.cardRepository.updateCards(type, updateCardsDto);
  }
  async updatePriority(cardId: string, updatePriorityDto: UpdatePriorityDto): Promise<ICard> {
    return await this.cardRepository.updatePriority(cardId, updatePriorityDto);
  }
  async updateColumnTypeAndPriority(cardId: string, updateColumnTypePriorityDto: UpdateColumnTypeAndPriorityDto): Promise<ICard> {
    return await this.cardRepository.updateColumnTypeAndPriority(cardId, updateColumnTypePriorityDto);
  }
  async deleteCard(cardId: string): Promise<ICard> {
    return await this.cardRepository.deleteCard(cardId);
  }
}
