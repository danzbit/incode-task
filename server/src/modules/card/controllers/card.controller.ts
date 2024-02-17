import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { CardService } from "../services/card.service";
import { ICards, ICard } from "../interfaces";
import { CreateCardDto } from "../dtos/createCard.dto";
import { UpdateCardDto } from "../dtos/updateCard.dto";
import { UpdatePriorityDto } from "../dtos/updatePriority.dto";
import { UpdateColumnTypeAndPriorityDto } from "../dtos/updateColumnTypeAndPriority.dto";
import { ColumnType } from "../enums";
import { UpdateCardsDto } from "../dtos/updateCardsDto";

@Controller("cards")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async getAll(): Promise<ICards[] | undefined> {
    return this.cardService.getAll();
  }

  @Get("by-id-and-type")
  async getAllByIdAndType(@Query("boardId") boardId: string, @Query("columnType") columnType: ColumnType): Promise<ICard[]> {
    return await this.cardService.getAllByIdAndType(boardId, columnType);
  }
  @Get("by-board-id")
  async getAllByBoardId(@Query("boardId") boardId: string): Promise<ICards[] | undefined> {
    return await this.cardService.getAllByBoardId(boardId);
  }

  @Post()
  async createCard(@Body() createCardDto: CreateCardDto): Promise<ICard | undefined> {
    return await this.cardService.createCard(createCardDto);
  }

  @Patch()
  async updateCard(@Query("title") cardTitle: string, @Body() updateCardDto: UpdateCardDto): Promise<ICard | undefined> {
    return await this.cardService.updateCard(cardTitle, updateCardDto);
  }

  @Put()
  async updateCards(@Query("type") type: ColumnType, @Body() updateCardsDto: UpdateCardsDto): Promise<ICard[]> {
    return await this.cardService.updateCards(type, updateCardsDto);
  }

  @Patch(":id")
  async updatePriority(@Param("id") cardId: string, @Body() updatePriorityDto: UpdatePriorityDto): Promise<ICard | undefined> {
    return await this.cardService.updatePriority(cardId, updatePriorityDto);
  }

  @Patch("column-priority/:id")
  async updateColumnTypeAndPriority(@Param("id") cardId: string, @Body() updateColumnTypePriorityDto: UpdateColumnTypeAndPriorityDto): Promise<ICard | undefined> {
    return await this.cardService.updateColumnTypeAndPriority(cardId, updateColumnTypePriorityDto);
  }

  @Delete(":id")
  async deleteCard(@Param("id") cardId: string): Promise<ICard | undefined> {
    return await this.cardService.deleteCard(cardId);
  }
}
