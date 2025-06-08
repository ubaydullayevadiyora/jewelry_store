import { Module } from "@nestjs/common";
import { MailService } from "./email-service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OtpCode } from "../../otp/entities/otp.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OtpCode]),],
  providers: [MailService],
  exports: [MailService],
})
export class MailServiceModule {}
