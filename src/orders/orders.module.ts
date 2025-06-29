import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";

import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { OrderItem } from "../order_items/entities/order_item.entity";
import { Product } from "../products/entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrderModule {}
