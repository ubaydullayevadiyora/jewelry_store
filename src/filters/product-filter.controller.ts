import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminJwtGuard } from "../common/guards/admin-jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { GetProductService } from "./product-filter.service";

@ApiTags("Product")
@Controller("get-products")
export class GetProductController {
  constructor(private readonly getProductService: GetProductService) {}

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  getProducts(
    @Query("minPrice") minPrice?: string,
    @Query("maxPrice") maxPrice?: string
  ) {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;

    return this.getProductService.getProductsByPriceRange(min, max);
  }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  getProductsByProba(@Query("proba") proba?: string) {
    return this.getProductService.getProductsByProba({ proba });
  }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  getProductsByMaterialName(@Query("materialName") materialName: string) {
    return this.getProductService.getProductsByMaterialName(materialName);
  }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get("by-size-category")
  getProductsBySizeAndCategory(
    @Query("minSize") minSize?: number,
    @Query("maxSize") maxSize?: number,
    @Query("category_id") category_id?: number
  ) {
    return this.getProductService.getProductsBySizeAndCategory(
      minSize,
      maxSize,
      category_id
    );
  }
}
