import { CustomerJwtGuard } from "./../common/guards/customer-jwt.guard";
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
import { RolesGuard } from "../common/guards/roles.guard";
import { ManagerJwtGuard } from "../common/guards/manager-jwt.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/role.enum";

@ApiTags("Product")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Post()
  @ApiResponse({ status: 201, type: Product })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(ManagerJwtGuard, CustomerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Get(":id")
  @ApiResponse({ status: 200, type: Product })
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Patch(":id")
  @ApiResponse({ status: 200, type: Product })
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Delete(":id")
  @ApiResponse({ status: 200 })
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
