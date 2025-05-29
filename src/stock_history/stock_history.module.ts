import { Module } from '@nestjs/common';
import { StockHistoryService } from './stock_history.service';
import { StockHistoryController } from './stock_history.controller';

@Module({
  controllers: [StockHistoryController],
  providers: [StockHistoryService],
})
export class StockHistoryModule {}
