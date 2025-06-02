import { Injectable } from "@nestjs/common";

@Injectable()
export class OtpService {
  generateOtp(length = 6): number {
    return Math.floor(Math.random() * Math.pow(10, length));
  }

  getExpiry(minutes = 5): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
  }

  isOtpExpired(expiryDate: Date): boolean {
    return expiryDate < new Date();
  }
}
