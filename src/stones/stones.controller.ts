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
import { StonesService } from "./stones.service";
import { CreateStoneDto } from "./dto/create-stone.dto";
import { UpdateStoneDto } from "./dto/update-stone.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { ManagerJwtGuard } from "../common/guards/manager-jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("Stones")
@Controller("stones")
export class StonesController {
  constructor(private readonly stonesService: StonesService) {}

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Post()
  @ApiOperation({ summary: "Create a new stone" })
  create(@Body() dto: CreateStoneDto) {
    return this.stonesService.create(dto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get()
  @ApiOperation({ summary: "Get all stones" })
  findAll() {
    return this.stonesService.findAll();
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get(":id")
  @ApiOperation({ summary: "Get a stone by ID" })
  findOne(@Param("id") id: string) {
    return this.stonesService.findOne(+id);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Put(":id")
  @ApiOperation({ summary: "Update a stone" })
  update(@Param("id") id: string, @Body() dto: UpdateStoneDto) {
    return this.stonesService.update(+id, dto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a stone" })
  remove(@Param("id") id: string) {
    return this.stonesService.remove(+id);
  }
}
