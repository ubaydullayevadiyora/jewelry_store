import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UnauthorizedException,
  HttpCode,
} from "@nestjs/common";
import { SignInCustomerDto } from "./dto/customer-sign-in.dto";
import { Response, Request } from "express";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CustomerAuthService } from "./customer-auth.service";
import { CreateCustomerDto } from "../../customer/dto/create-customer.dto";

@ApiTags("Customer Auth")
@Controller("auth/customer")
export class CustomerAuthController {
  constructor(private readonly customerAuthService: CustomerAuthService) {}

  @Post("sign-up")
  @ApiOperation({ summary: "Customer royxatdan otadi" })
  @ApiResponse({ status: 201, description: "OTP yuborildi" })
  async signUp(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerAuthService.signUp(createCustomerDto);
  }

  @Post("sign-in")
  @ApiOperation({ summary: "Customer tizimga kiradi" })
  @ApiResponse({ status: 201, description: "Tokenlar qaytariladi" })
  async signIn(
    @Body() signInDto: SignInCustomerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerAuthService.signIn(signInDto, res);
  }

  @Post("sign-out")
  @HttpCode(200)
  @ApiOperation({ summary: "Customer tizimdan chiqadi" })
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) throw new UnauthorizedException("Token mavjud emas");

    return this.customerAuthService.signOut(refreshToken, res);
  }

  @Post("refresh")
  @HttpCode(200)
  @ApiOperation({ summary: "Tokenlarni yangilash" })
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) throw new UnauthorizedException("Token mavjud emas");

    return this.customerAuthService.refreshToken(refreshToken, res);
  }
}
