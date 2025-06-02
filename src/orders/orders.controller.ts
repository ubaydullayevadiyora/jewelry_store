import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  @ApiOperation({ summary: "Create order with items" })
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all orders with items and products" })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get order by ID" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update order" })
  update(@Param("id") id: string, @Body() dto: UpdateOrderDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete order" })
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
