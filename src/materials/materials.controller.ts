import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { MaterialsService } from "./materials.service";
import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Materials")
@Controller("materials")
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiOperation({ summary: "Create new material" })
  create(@Body() dto: CreateMaterialDto) {
    return this.materialsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all materials with related products" })
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get material by ID with products" })
  findOne(@Param("id") id: string) {
    return this.materialsService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update material" })
  update(@Param("id") id: string, @Body() dto: UpdateMaterialDto) {
    return this.materialsService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete material" })
  remove(@Param("id") id: string) {
    return this.materialsService.remove(+id);
  }
}
