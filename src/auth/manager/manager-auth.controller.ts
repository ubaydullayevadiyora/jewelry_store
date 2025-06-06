import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UnauthorizedException,
  HttpCode,
} from "@nestjs/common";

import { Response, Request } from "express";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ManagerAuthService } from "./manager-auth.service";
import { SignInManagerDto } from "./dto/manager.auth.dto";

@ApiTags("Manager Auth")
@Controller("auth/manager")
export class ManagerAuthController {
  constructor(private readonly managerAuthService: ManagerAuthService) {}

  @Post("sign-in")
  @ApiOperation({ summary: "Manager tizimga kiradi" })
  @ApiResponse({ status: 201, description: "Tokenlar qaytariladi" })
  async signIn(
    @Body() signInDto: SignInManagerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.managerAuthService.signIn(signInDto, res);
  }

  @Post("sign-out")
  @HttpCode(200)
  @ApiOperation({ summary: "Manager tizimdan chiqadi" })
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) throw new UnauthorizedException("Token mavjud emas");

    return this.managerAuthService.signOut(refreshToken, res);
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

    return this.managerAuthService.refreshToken(refreshToken, res);
  }
}
