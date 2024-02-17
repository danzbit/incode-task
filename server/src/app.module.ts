import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_CONNECTION_STRING } from "./environmets";
import { BoardModule } from "./modules/board/board.module";
import { CardModule } from "./modules/card/card.module";

@Module({
  imports: [MongooseModule.forRoot(MONGO_CONNECTION_STRING), BoardModule, CardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
