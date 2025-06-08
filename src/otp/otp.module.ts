import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OtpService } from "./otp.service";
import { OtpController } from "./otp.controller";
import { OtpCode } from "./entities/otp.entity";
import { Customer } from "../customer/entities/customer.entity";
import { MailServiceModule } from "../common/services/email-service.module";

@Module({
  imports: [TypeOrmModule.forFeature([OtpCode, Customer]), MailServiceModule],
  providers: [OtpService],
  controllers: [OtpController],
  exports: [OtpService],
})
export class OtpModule {}
