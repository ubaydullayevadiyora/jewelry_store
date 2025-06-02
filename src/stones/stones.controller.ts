import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { StonesService } from "./stones.service";
import { CreateStoneDto } from "./dto/create-stone.dto";
import { UpdateStoneDto } from "./dto/update-stone.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Stones")
@Controller("stones")
export class StonesController {
  constructor(private readonly stonesService: StonesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new stone" })
  create(@Body() dto: CreateStoneDto) {
    return this.stonesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all stones" })
  findAll() {
    return this.stonesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a stone by ID" })
  findOne(@Param("id") id: string) {
    return this.stonesService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a stone" })
  update(@Param("id") id: string, @Body() dto: UpdateStoneDto) {
    return this.stonesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a stone" })
  remove(@Param("id") id: string) {
    return this.stonesService.remove(+id);
  }
}
