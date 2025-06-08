import { IsString, IsPhoneNumber, Length, IsEmail } from "class-validator";

export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6)
  otp_code: string;
}
