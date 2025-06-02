import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { StocksService } from "./stock.service";

@ApiTags("Stocks")
@Controller("stocks")
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  @ApiOperation({ summary: "Create new stock for a product" })
  create(@Body() dto: CreateStockDto) {
    return this.stocksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all stock records" })
  findAll() {
    return this.stocksService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get stock by ID" })
  findOne(@Param("id") id: string) {
    return this.stocksService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update stock record" })
  update(@Param("id") id: string, @Body() dto: UpdateStockDto) {
    return this.stocksService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete stock" })
  remove(@Param("id") id: string) {
    return this.stocksService.remove(+id);
  }
}
