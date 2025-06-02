import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Admin } from "./admins/entities/admin.entity";
import { AdminModule } from "./admins/admins.module";
import { CustomerModule } from "./customer/customer.module";
import { ManagerModule } from "./manager/manager.module";
import { MaterialsModule } from "./materials/materials.module";
import { StonesModule } from "./stones/stones.module";
import { StockHistoryModule } from "./stock_history/stock_history.module";
import { OrdersModule } from "./orders/orders.module";
import { OrderItemsModule } from "./order_items/order_items.module";
import { PaymentsModule } from "./payments/payments.module";
import { DeliveryModule } from "./delivery/delivery.module";
import { Manager } from "./manager/entities/manager.entity";
import { Customer } from "./customer/entities/customer.entity";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./products/products.module";
import { StocksModule } from "./stock/stock.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Admin, Manager, Customer],
      synchronize: true,
      autoLoadEntities: true,
    }),

    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: "schema.gql",
    //   sortSchema: true,
    //   playground: true,
    // }),

    AdminModule,
    CustomerModule,
    ManagerModule,
    ProductModule,
    MaterialsModule,
    StonesModule,
    StockHistoryModule,
    StocksModule,
    OrdersModule,
    OrderItemsModule,
    PaymentsModule,
    DeliveryModule,
    AuthModule,
  ],
  // controllers: [AdminController, CustomerController, ManagerController],
  // providers: [AdminService, CustomerService, ManagerService],
})
export class AppModule {}
