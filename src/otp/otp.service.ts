import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OtpCode } from "./entities/otp.entity";
import { Customer } from "../customer/entities/customer.entity";

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpCode)
    private otpRepository: Repository<OtpCode>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
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

    const customer = await this.customerRepository.findOne({
      where: { email },
    });
    if (!customer) {
      throw new NotFoundException("Foydalanuvchi topilmadi.");
    }

    customer.is_active = true;
    await this.customerRepository.save(customer);

    return {
      message:
        "OTP muvaffaqiyatli tasdiqlandi va foydalanuvchi faollashtirildi.",
    };
  }
}
