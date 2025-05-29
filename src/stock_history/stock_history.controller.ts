import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockHistoryService } from './stock_history.service';
import { CreateStockHistoryDto } from './dto/create-stock_history.dto';
import { UpdateStockHistoryDto } from './dto/update-stock_history.dto';

@Controller('stock-history')
export class StockHistoryController {
  constructor(private readonly stockHistoryService: StockHistoryService) {}

  @Post()
  create(@Body() createStockHistoryDto: CreateStockHistoryDto) {
    return this.stockHistoryService.create(createStockHistoryDto);
  }

  @Get()
  findAll() {
    return this.stockHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockHistoryDto: UpdateStockHistoryDto) {
    return this.stockHistoryService.update(+id, updateStockHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockHistoryService.remove(+id);
  }
}
