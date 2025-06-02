import { IsString, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class OrderItemDto {
  @ApiProperty()
  product_id: number;

  @ApiProperty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  customer_name: string;

  @ApiProperty()
  @IsString()
  customer_phone: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
