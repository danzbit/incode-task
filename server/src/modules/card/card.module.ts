import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Card, CardSchema } from "./db-schemas/card.db-schema";
import { CardController } from "./controllers/card.controller";
import { CardService } from "./services/card.service";
import { CardRepository } from "./repositories/card.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])],
  controllers: [CardController],
  providers: [CardService, CardRepository],
  exports: [CardService, CardRepository],
})
export class CardModule {}
