import { IsEmail, IsString, MinLength } from "class-validator";

export class SignInAdminDto {
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  readonly email: string;

  @IsString({ message: "Parol matn ko'rinishida bo'lishi kerak" })
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
  readonly password: string;
}
