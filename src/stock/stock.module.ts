import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stock } from "./entities/stock.entity";
import { Product } from "../products/entities/product.entity";
import { StocksController } from "./stock.controller";
import { StocksService } from "./stock.service";

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Product])],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
