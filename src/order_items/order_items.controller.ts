import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { OrderItemsService } from "./order_items.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CreateOrderItemDto } from "./dto/create-order_item.dto";
import { UpdateOrderItemDto } from "./dto/update-order_item.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { CustomerJwtGuard } from "../common/guards/customer-jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Role } from "../common/enums/role.enum";
import { ManagerJwtGuard } from "../common/guards/manager-jwt.guard";

@ApiTags("OrderItems")
@Controller("order-items")
export class OrderItemsController {
  constructor(private readonly service: OrderItemsService) {}

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post()
  @ApiOperation({ summary: "Create order item" })
  create(@Body() dto: CreateOrderItemDto) {
    return this.service.createOrderItem(dto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get()
  @ApiOperation({ summary: "Get all order items" })
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Get(":id")
  @ApiOperation({ summary: "Get order item by ID" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Put(":id")
  @ApiOperation({ summary: "Update order item" })
  update(@Param("id") id: string, @Body() dto: UpdateOrderItemDto) {
    return this.service.update(+id, dto);
  }

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Delete(":id")
  @ApiOperation({ summary: "Delete order item" })
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
