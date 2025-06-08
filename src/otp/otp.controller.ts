import { Controller, Post, Body } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@Controller("otp")
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post("verify")
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.otpService.verifyOtp(
      verifyOtpDto.email,
      verifyOtpDto.otp_code
    );
  }
}
