import { Field, InputType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

@InputType()
export class CreateManagerDto {
  @Field()
  @IsString()
  fullname: string;

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
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @Field()
  @IsOptional()
  @IsString()
  refresh_token?: string;
}
