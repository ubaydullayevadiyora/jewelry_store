import { Field, InputType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

@InputType()
export class CreateAdminDto {
  @Field()
  @IsString()
  username: string;

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
  is_super_admin?: boolean;

  @Field()
  @IsOptional()
  @IsString()
  refresh_token?: string;
}
