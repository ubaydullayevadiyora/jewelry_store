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
  @Field()
  @IsString()
  firstname: string;

  @Field()
  @IsString()
  lastname: string;

  @Field()
  @IsString()
  phone_number: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password_hash: string;

  @Field()
  @IsString()
  birth_date: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @Field()
  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @Field()
  @IsNumber()
  otp?: number;

  @Field()
  @IsOptional()
  @IsString()
  refresh_token?: string;
}
