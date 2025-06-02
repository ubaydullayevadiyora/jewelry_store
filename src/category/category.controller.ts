import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CategoriesService } from "./category.service";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: "Create category" })
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all categories" })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get category by ID" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update category" })
  update(@Param("id") id: string, @Body() dto: UpdateCategoryDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete category" })
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
