import { AdminJwtGuard } from "./../common/guards/admin-jwt.guard";
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
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { StocksService } from "./stock.service";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { ManagerJwtGuard } from "../common/guards/manager-jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("Stocks")
@Controller("stocks")
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: "Create new stock for a product" })
  create(@Body() dto: CreateStockDto) {
    return this.stocksService.create(dto);
  }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: "Get all stock records" })
  findAll() {
    return this.stocksService.findAll();
  }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(":id")
  @ApiOperation({ summary: "Get stock by ID" })
  findOne(@Param("id") id: string) {
    return this.stocksService.findOne(+id);
  }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(":id")
  @ApiOperation({ summary: "Update stock record" })
  update(@Param("id") id: string, @Body() dto: UpdateStockDto) {
    return this.stocksService.update(+id, dto);
  }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  @ApiOperation({ summary: "Delete stock" })
  remove(@Param("id") id: string) {
    return this.stocksService.remove(+id);
  }
}
