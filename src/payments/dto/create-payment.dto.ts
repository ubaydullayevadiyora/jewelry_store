import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { PaymentStatus, PaymentType } from "../entities/payment.entity";

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  paid_at?: Date;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsEnum(PaymentType)
  type: PaymentType;
}
