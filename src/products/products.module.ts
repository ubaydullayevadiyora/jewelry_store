import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { Material } from "../materials/entities/material.entity";
import { Stone } from "../stones/entities/stone.entity";
import { Category } from "../category/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Material, Stone, Category])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
