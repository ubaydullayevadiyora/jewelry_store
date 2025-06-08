import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignInCustomerDto } from "./dto/customer-sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { Customer } from "../../customer/entities/customer.entity";
import { CreateCustomerDto } from "../../customer/dto/create-customer.dto";
import { MailService } from "../../common/services/email-service";
import { OtpService } from "../../otp/otp.service";

@Injectable()
export class CustomerAuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly mailService: MailService
  ) {}

  async generateTokens(customer: Customer) {
    const payload = {
      id: customer.id,
      email: customer.email,
      role: "customer",
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(dto: CreateCustomerDto) {
    try {
      const saltOrRounds = 10;
      dto.password = await bcrypt.hash(dto.password, saltOrRounds);
      delete dto.confirm_password;

      const customer = this.customerRepo.create(dto);
      customer.is_active = false;

      await this.customerRepo.save(customer);

      await this.customerRepo.save(customer);

      const otp = await this.otpService.generateOtp(customer.email);

      if (customer.email) {
        const subject = "Royxatdan otish va OTP kodni olish";
        const message = `Assalomu alaykum, ${customer.firstname}!\n\nRoyxatdan otganingiz uchun rahmat.\n\nIltimos, quyidagi OTP kodingizni oling:\n${otp}`;

        await this.mailService.sendMail(customer.email, subject, message);
      }

      return {
        message:
          "Royxatdan otish muvaffaqiyatli o'tdi. Iltimos, emailni tekshiring.",
      };
    } catch (error) {
      if (error.code === "23505") {
        if (error.detail.includes("(email)")) {
          throw new BadRequestException(
            "Bu email bilan foydalanuvchi allaqachon mavjud."
          );
        }
        if (error.detail.includes("(phone_number)")) {
          throw new BadRequestException(
            "Bu telefon raqami bilan foydalanuvchi allaqachon mavjud."
          );
        }
      }

      console.error("SIGN UP ERROR:", error);
      throw new InternalServerErrorException(
        "Serverda kutilmagan xatolik yuz berdi."
      );
    }
  }

  async signIn(signInCustomerDto: SignInCustomerDto, res: Response) {
    const customer = await this.customerRepo.findOne({
      where: { email: signInCustomerDto.email },
    });

    if (!customer) {
      throw new BadRequestException("Customer topilmadi");
    }

    if (!customer.is_active) {
      throw new ForbiddenException(
        "Customer faollashtirilmagan. Iltimos emaildagi otp code orqali o'zingizni tasdiqlang!!!"
      );
    }

    const isMatch = await bcrypt.compare(
      signInCustomerDto.password,
      customer.password
    );

    if (!isMatch) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(customer);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    customer.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.customerRepo.save(customer);

    return {
      message: "Customer tizimga kirdi",
      accessToken,
      refreshToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }

    await this.customerRepo.update(userData.id, {
      hashed_refresh_token: null,
    });

    res.clearCookie("refresh_token");
    return {
      message: "Customer tizimdan chiqdi",
    };
  }

  async refreshToken(refresh_token: string, res: Response) {
    if (!refresh_token) {
      throw new UnauthorizedException("Refresh token mavjud emas");
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto'g'ri yoki eskirgan");
    }

    const customer = await this.customerRepo.findOne({
      where: { id: payload.id },
    });
    if (!customer || !customer.hashed_refresh_token) {
      throw new UnauthorizedException("Token yoki customer topilmadi");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      customer.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(customer);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    customer.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await this.customerRepo.save(customer);

    return {
      message: "Tokenlar yangilandi",
      accessToken,
    };
  }
}
