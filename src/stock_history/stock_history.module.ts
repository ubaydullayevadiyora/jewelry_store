import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockHistoryService } from "./stock_history.service";
import { StockHistoryController } from "./stock_history.controller";
import { StockHistory } from "./entities/stock_history.entity";
import { Stock } from "../stock/entities/stock.entity";

@Module({
  imports: [TypeOrmModule.forFeature([StockHistory, Stock])],
  controllers: [StockHistoryController],
  providers: [StockHistoryService],
})
export class StockHistoryModule {}
