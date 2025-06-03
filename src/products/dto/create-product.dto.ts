import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsNumber()
  material_id: number;

  // @ApiProperty()
  // @IsNumber()
  // stone_id: number;

  @ApiProperty()
  @IsNumber()
  category_id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsNumber()
  size: number;

  @ApiProperty()
  @IsString()
  image_url: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ type: [Number] })
  stones: number[];
}
