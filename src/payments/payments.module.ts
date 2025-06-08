import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Order } from "../orders/entities/order.entity";
import { PaymentController } from "./payments.controller";
import { PaymentService } from "./payments.service";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order])],
  controllers: [PaymentController],
  providers: [PaymentService
  ],
})
export class PaymentModule {}
