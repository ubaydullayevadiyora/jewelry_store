import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { StockHistoryService } from "./stock_history.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CreateStockHistoryDto } from "./dto/create-stock_history.dto";
import { UpdateStockHistoryDto } from "./dto/update-stock_history.dto";

@ApiTags("StockHistory")
@Controller("stock-history")
export class StockHistoryController {
  constructor(private readonly service: StockHistoryService) {}

  @Post()
  @ApiOperation({ summary: "Create stock history record" })
  create(@Body() dto: CreateStockHistoryDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all stock history records" })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get stock history by ID" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update stock history" })
  update(@Param("id") id: string, @Body() dto: UpdateStockHistoryDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete stock history" })
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
