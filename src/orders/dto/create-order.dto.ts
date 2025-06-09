import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  Min,
  ArrayNotEmpty,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateOrderItemDto } from "../../order_items/dto/create-order_item.dto";

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

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
