import { IsInt, IsNumber, IsOptional } from "class-validator";

export class CreateOrderItemDto {
  @IsInt()
  order_id: number;

  @IsInt()
  product_id: number;

  @IsInt()
  quantity: number;

  @IsOptional()
  @IsNumber()
  price_at_order_time: number;
}
