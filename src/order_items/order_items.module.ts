import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItemsService } from "./order_items.service";
import { OrderItemsController } from "./order_items.controller";
import { OrderItem } from "./entities/order_item.entity";
import { Order } from "../orders/entities/order.entity";
import { Product } from "../products/entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order, Product])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
