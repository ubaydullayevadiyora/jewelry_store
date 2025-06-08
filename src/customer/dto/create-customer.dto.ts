import { Field, InputType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

@InputType()
export class CreateCustomerDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  phone_number: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  confirm_password?: string | null

  @IsString()
  birth_date: string;

  @IsString()
  address: string;
}
