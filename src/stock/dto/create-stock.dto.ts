import { IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStockDto {
  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  product_id: number;
}
