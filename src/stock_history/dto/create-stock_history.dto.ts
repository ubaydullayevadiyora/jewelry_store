import { IsInt, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStockHistoryDto {
  @ApiProperty()
  @IsInt()
  change: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty()
  @IsInt()
  stockId: number;
}
