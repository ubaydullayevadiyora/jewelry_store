import {
  BadRequestException,
  ForbiddenException,
  Injectable,
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
import { OtpService } from "../../common/services/otp.service";
import { MailService } from "../../common/services/email.service";
import { TelegramBotService } from "../../bot/bot.service";

@Injectable()
export class CustomerAuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly telegramBotService: TelegramBotService,
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
    const customer = this.customerRepo.create(dto);
    customer.is_active = false;

    const otp = this.otpService.generateOtp().toString();
    customer.otp_code = otp;
    customer.otp_expire_at = this.otpService.getExpiry();

    await this.customerRepo.save(customer);

    // if (customer.telegram_id) {
    //   await this.telegramBotService.sendOtpToTelegram(
    //     customer.telegram_id,
    //     Number(otp)
    //   );
    // }

    const telegramBotLink = process.env.TELEGRAM_BOT_LINK;

    if (customer.email) {
      const subject = "Royxatdan otish va OTP tasdiqlash";
      const message = `Assalomu alaykum, ${customer.firstname}!\n\nRoyxatdan otganingiz uchun rahmat.\n\nIltimos, quyidagi Telegram bot orqali otp kodingizni oling:\n${telegramBotLink}`;

      await this.mailService.sendMail(customer.email, subject, message);
    }
    return {
      message:
        "Royxatdan otish muvaffaqiyatli. Iltimos, Emailni tekshiring."
    };
  }

  async verifyOtp(dto: { telegram_id: string; otp: string }) {
    const customer = await this.customerRepo.findOne({
      where: { telegram_id: dto.telegram_id },
    });

    if (!customer) throw new NotFoundException("Foydalanuvchi topilmadi");

    if (customer.otp_code !== dto.otp)
      throw new BadRequestException("OTP notogri");

    if (customer.otp_expire_at && customer.otp_expire_at < new Date()) {
      throw new BadRequestException("OTP muddati tugagan");
    }

    customer.is_active = true;
    customer.otp_code = null;
    customer.otp_expire_at = null;
    await this.customerRepo.save(customer);

    return { message: "Tasdiq muvaffaqiyatli yakunlandi ✅" };
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
        "Hisob faollashtirilmagan. Telegram bot orqali OTP tasdiqlang!!!"
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
