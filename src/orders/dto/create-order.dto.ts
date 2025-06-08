import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  Min,
  ArrayNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";

class OrderItemDto {
  @IsInt()
  product_id: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsInt()
  customer_id: number;

  @IsInt()
  manager_id: number;

  @IsInt()
  @Min(0)
  total_price: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  delivery_option: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
