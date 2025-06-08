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
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles.decorator";
import { ManagerJwtGuard } from "../common/guards/manager-jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Role } from "../common/enums/role.enum";
import { CustomerJwtGuard } from "../common/guards/customer-jwt.guard";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post()
  @ApiOperation({ summary: "Create order with items" })
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get()
  @ApiOperation({ summary: "Get all orders with items and products" })
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Get(":id")
  @ApiOperation({ summary: "Get order by ID" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Put(":id")
  @ApiOperation({ summary: "Update order" })
  update(@Param("id") id: string, @Body() dto: UpdateOrderDto) {
    return this.service.update(+id, dto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Delete(":id")
  @ApiOperation({ summary: "Delete order" })
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
