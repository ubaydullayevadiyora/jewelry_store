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
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CategoriesService } from "./category.service";
import { Roles } from "../common/decorators/roles.decorator";
import { ManagerJwtGuard } from "../common/guards/manager-jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Role } from "../common/enums/role.enum";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Post()
  @ApiOperation({ summary: "Create category" })
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get()
  @ApiOperation({ summary: "Get all categories" })
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get(":id")
  @ApiOperation({ summary: "Get category by ID" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Put(":id")
  @ApiOperation({ summary: "Update category" })
  update(@Param("id") id: string, @Body() dto: UpdateCategoryDto) {
    return this.service.update(+id, dto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Delete(":id")
  @ApiOperation({ summary: "Delete category" })
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
