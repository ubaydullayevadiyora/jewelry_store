import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderItemDto {
  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsInt()
  orderId: number;

  @ApiProperty()
  @IsInt()
  productId: number;
}
