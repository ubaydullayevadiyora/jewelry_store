import {
  IsEnum,
  IsOptional,
  IsString,
  IsDecimal,
  IsDateString,
  IsInt,
} from "class-validator";
import { DeliveryType, DeliveryStatus } from "../entities/delivery.entity";

export class CreateDeliveryDto {
  @IsInt()
  order_id: number;

  @IsEnum(DeliveryType)
  delivery_type: DeliveryType;

  @IsOptional()
  @IsString()
  address?: string;

  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @IsOptional()
  delivery_price: number;

  @IsOptional()
  @IsDateString()
  delivery_at: Date;
}
