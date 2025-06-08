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
import { MaterialsService } from "./materials.service";
import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminJwtGuard } from "../common/guards/admin-jwt.guard";
import { ManagerJwtGuard } from "../common/guards/manager-jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Role } from "../common/enums/role.enum";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Materials")
@Controller("materials")
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @UseGuards(ManagerJwtGuard, AdminJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Post()
  @ApiOperation({ summary: "Create new material" })
  create(@Body() dto: CreateMaterialDto) {
    return this.materialsService.create(dto);
  }

  @UseGuards(ManagerJwtGuard, AdminJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get()
  @ApiOperation({ summary: "Get all materials with related products" })
  findAll() {
    return this.materialsService.findAll();
  }

  @UseGuards(ManagerJwtGuard, AdminJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get(":id")
  @ApiOperation({ summary: "Get material by ID with products" })
  findOne(@Param("id") id: string) {
    return this.materialsService.findOne(+id);
  }

  @UseGuards(ManagerJwtGuard,AdminJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Put(":id")
  @ApiOperation({ summary: "Update material" })
  update(@Param("id") id: string, @Body() dto: UpdateMaterialDto) {
    return this.materialsService.update(+id, dto);
  }

  @UseGuards(ManagerJwtGuard, AdminJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Delete(":id")
  @ApiOperation({ summary: "Delete material" })
  remove(@Param("id") id: string) {
    return this.materialsService.remove(+id);
  }
}
