import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { OrderItemsService } from "./order_items.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CreateOrderItemDto } from "./dto/create-order_item.dto";
import { UpdateOrderItemDto } from "./dto/update-order_item.dto";

@ApiTags("OrderItems")
@Controller("order-items")
export class OrderItemsController {
  constructor(private readonly service: OrderItemsService) {}

  @Post()
  @ApiOperation({ summary: "Create order item" })
  create(@Body() dto: CreateOrderItemDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all order items" })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get order item by ID" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update order item" })
  update(@Param("id") id: string, @Body() dto: UpdateOrderItemDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete order item" })
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
