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
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { ProductService } from "./products.service";
import { Product } from "./entities/product.entity";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("Product")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({ status: 201, type: Product })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: Product })
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, type: Product })
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(":id")
  @ApiResponse({ status: 200 })
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
