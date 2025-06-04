import { Field, InputType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
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

  @IsString()
  @MinLength(6)
  confirm_password: string;

  @IsString()
  birth_date: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsNumber()
  otp_code: string;

  @IsOptional()
  @IsString()
  telegram_id: string;
}
