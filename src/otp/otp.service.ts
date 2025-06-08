import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OtpCode } from "./entities/otp.entity";

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpCode)
    private otpRepository: Repository<OtpCode>
  ) {}

  async generateOtp(email: string): Promise<string> {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const otp = this.otpRepository.create({
      email,
      otp_code: otpCode,
      otp_expire_at: expiresAt,
    });

    await this.otpRepository.save(otp);
    return otpCode;
  }

  async verifyOtp(email: string, otp: string): Promise<{ message: string }> {
    const found = await this.otpRepository.findOne({
      where: { email, otp_code: otp },
      order: { otp_expire_at: "DESC" },
    });

    if (!found) {
      throw new BadRequestException("Kod notogri.");
    }

    if (found.is_used) {
      return { message: "Ushbu OTP allaqachon ishlatilgan." };
    }

    if (found.otp_expire_at < new Date()) {
      throw new BadRequestException("Kod eskirgan.");
    }

    found.is_used = true;
    await this.otpRepository.save(found);

    return { message: "OTP muvaffaqiyatli tasdiqlandi." };
  }
}
