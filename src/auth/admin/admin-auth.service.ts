// src/auth/admin/admin.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "../../admins/entities/admin.entity";
import { SignInAdminDto } from "./dto/admin.auth.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      role: "admin",
      is_super_admin: admin.is_super_admin,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(signInAdminDto: SignInAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { email: signInAdminDto.email },
    });

    if (!admin) {
      throw new BadRequestException("Admin topilmadi");
    }

    const isMatch = await bcrypt.compare(
      signInAdminDto.password,
      admin.password_hash
    );

    if (!isMatch) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.is_active = true;

    admin.last_login = new Date();

    await this.adminRepo.save(admin);

    return {
      message: "Admin tizimga kirdi",
      accessToken,
      refreshToken,
    };
  }

  async signOutById(id: number, res: Response) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }

    admin.hashed_refresh_token = null;
    await this.adminRepo.save(admin);

    res.clearCookie("refresh_token");
    return {
      message: "Admin tizimdan chiqdi",
    };
  }

  async refreshToken(refresh_token: string, res: Response) {
    if (!refresh_token) {
      throw new UnauthorizedException("Refresh token mavjud emas");
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto'g'ri yoki eskirgan");
    }

    const admin = await this.adminRepo.findOne({ where: { id: payload.id } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new UnauthorizedException("Token yoki admin topilmadi");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(admin);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    admin.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await this.adminRepo.save(admin);

    return {
      message: "Tokenlar yangilandi",
      accessToken,
    };
  }
}
