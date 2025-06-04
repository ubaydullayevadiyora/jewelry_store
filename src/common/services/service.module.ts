import { Module } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { EmailService } from "./email.service";
import { TelegramService } from "./telegram.service";

@Module({
  providers: [OtpService, EmailService, TelegramService],
  exports: [OtpService, EmailService, TelegramService],
})
export class ServiceModule {}
