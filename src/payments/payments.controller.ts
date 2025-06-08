import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ManagerJwtGuard } from '../common/guards/manager-jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CustomerJwtGuard } from '../common/guards/customer-jwt.guard';

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
