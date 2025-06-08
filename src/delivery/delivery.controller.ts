import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { DeliveryService } from "./delivery.service";
import { CreateDeliveryDto } from "./dto/create-delivery.dto";
import { UpdateDeliveryDto } from "./dto/update-delivery.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { CustomerJwtGuard } from "../common/guards/customer-jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { AdminJwtGuard } from "../common/guards/admin-jwt.guard";
import { ManagerJwtGuard } from "../common/guards/manager-jwt.guard";

@Controller("delivery")
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get()
  findAll() {
    return this.deliveryService.findAll();
  }

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.deliveryService.findOne(+id);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto
  ) {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.deliveryService.remove(+id);
  }
}
