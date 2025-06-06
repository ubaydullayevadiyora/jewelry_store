import { Module } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { MailService } from "./email.service";

@Module({
  providers: [OtpService, MailService],
  exports: [OtpService, MailService],
})
export class ServiceModule {}
