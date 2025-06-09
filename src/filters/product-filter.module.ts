import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/entities/product.entity";
import { GetProductController } from "./product-filter.controller";
import { GetProductService } from "./product-filter.service";
import { Stone } from "../stones/entities/stone.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Stone])],
  controllers: [GetProductController],
  providers: [GetProductService],
  exports:[GetProductService]
})
export class GetProductModule {}
