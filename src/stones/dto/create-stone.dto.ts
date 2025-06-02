import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStoneDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  carat: string;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsString()
  shape: string;

  @ApiProperty()
  @IsString()
  origin: string;
}
