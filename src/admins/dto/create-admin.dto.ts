import {InputType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

@InputType()
export class CreateAdminDto {
  @IsString()
  username: string;

  @IsString()
  phone_number: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password_hash: string;

  @IsString()
  @MinLength(6)
  confirm_password: string;

  @IsOptional()
  @IsBoolean()
  is_super_admin?: boolean;

  @IsOptional()
  @IsString()
  refresh_token?: string;
}
