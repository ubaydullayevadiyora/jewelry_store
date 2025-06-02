import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty()
  material_id: number;

  @ApiProperty()
  stone_id: number;

  @ApiProperty()
  category_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  image_url: string;

  @ApiProperty({ default: true })
  is_active: boolean;
}
