import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UnauthorizedException,
  HttpCode,
} from "@nestjs/common";
import { AdminAuthService } from "./admin-auth.service";
import { SignInAdminDto } from "./dto/admin.auth.dto";
import { Response, Request } from "express";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Admin Auth")
@Controller("auth/admin")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("sign-in")
  @ApiOperation({ summary: "Admin tizimga kiradi" })
  @ApiResponse({ status: 201, description: "Tokenlar qaytariladi" })
  async signIn(
    @Body() signInDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.signIn(signInDto, res);
  }

  @Post("sign-out")
  @HttpCode(200)
  @ApiOperation({ summary: "Admin tizimdan chiqadi" })
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) throw new UnauthorizedException("Token mavjud emas");

    return this.adminAuthService.signOut(refreshToken, res);
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

    return this.adminAuthService.refreshToken(refreshToken, res);
  }
}
