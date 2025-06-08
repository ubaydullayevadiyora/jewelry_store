import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WinstonModule } from "nest-winston";

import { Admin } from "./admins/entities/admin.entity";
import { AdminModule } from "./admins/admins.module";
import { CustomerModule } from "./customer/customer.module";
import { ManagerModule } from "./manager/manager.module";
import { MaterialsModule } from "./materials/materials.module";
import { StonesModule } from "./stones/stones.module";
import { StockHistoryModule } from "./stock_history/stock_history.module";
import { OrderItemsModule } from "./order_items/order_items.module";
import { DeliveryModule } from "./delivery/delivery.module";
import { Manager } from "./manager/entities/manager.entity";
import { Customer } from "./customer/entities/customer.entity";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./products/products.module";
import { StocksModule } from "./stock/stock.module";
import { Product } from "./products/entities/product.entity";
import { Material } from "./materials/entities/material.entity";
import { Stock } from "./stock/entities/stock.entity";
import { Stone } from "./stones/entities/stone.entity";
import { Category } from "./category/entities/category.entity";
import { Delivery } from "./delivery/entities/delivery.entity";
import { Order } from "./orders/entities/order.entity";
import { OrderItem } from "./order_items/entities/order_item.entity";
import { CategoriesModule } from "./category/category.module";
import { Payment } from "./payments/entities/payment.entity";
import { StockHistory } from "./stock_history/entities/stock_history.entity";
import { OtpModule } from "./otp/otp.module";
import { OtpCode } from "./otp/entities/otp.entity";
import { winstonConfig } from "./common/logger/winston.logger";
import { PaymentModule } from "./payments/payments.module";
import { OrderModule } from "./orders/orders.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),

    WinstonModule.forRoot(winstonConfig),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        Admin,
        Manager,
        Customer,
        Product,
        Material,
        Stock,
        Stone,
        Category,
        Delivery,
        Order,
        OrderItem,
        Payment,
        StockHistory,
        OtpCode,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),

    AdminModule,
    CustomerModule,
    ManagerModule,
    ProductModule,
    MaterialsModule,
    StonesModule,
    StockHistoryModule,
    StocksModule,
    OrderModule,
    OrderItemsModule,
    PaymentModule,
    DeliveryModule,
    CategoriesModule,
    AuthModule,
    OtpModule,
  ],
})
export class AppModule {}
