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
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { Customer } from "./entities/customer.entity";
import { Roles } from "../common/decorators/roles.decorator";
import { CustomerJwtGuard } from "../common/guards/customer-jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Role } from "../common/enums/role.enum";
import { AdminJwtGuard } from "../common/guards/admin-jwt.guard";

@ApiTags("Customer")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @Post()
  // @ApiOperation({ summary: "Yangi customer yaratish" })
  // @ApiResponse({
  //   status: 201,
  //   description: "Customer muvaffaqiyatli yaratildi",
  //   type: Customer,
  // })
  // create(@Body() createCustomerDto: CreateCustomerDto) {
  //   return this.customerService.create(createCustomerDto);
  // }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: "Barcha customerlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha customerlar royxati",
    type: [Customer],
  })
  findAll() {
    return this.customerService.findAll();
  }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(":id")
  @ApiOperation({ summary: "Bitta customerni ID orqali olish" })
  @ApiParam({ name: "id", type: Number, description: "Customer ID" })
  @ApiResponse({ status: 200, description: "Customer topildi", type: Customer })
  findOne(@Param("id") id: string) {
    return this.customerService.findOne(+id);
  }

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Patch(":id")
  @ApiOperation({ summary: "Customer malumotlarini tahrirlash" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Customer muvaffaqiyatli yangilandi",
    type: Customer,
  })
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @UseGuards(CustomerJwtGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Delete(":id")
  @ApiOperation({ summary: "Customerni ochirish" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Customer muvaffaqiyatli ochirildi",
  })
  remove(@Param("id") id: string) {
    return this.customerService.remove(+id);
  }
}
