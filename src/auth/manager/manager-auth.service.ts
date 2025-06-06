// src/auth/manager/manager.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignInManagerDto } from "./dto/manager.auth.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { Manager } from "../../manager/entities/manager.entity";

@Injectable()
export class ManagerAuthService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepo: Repository<Manager>,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(manager: Manager) {
    const payload = {
      id: manager.id,
      email: manager.email,
      role: "manager",
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

  async signIn(signInManagerDto: SignInManagerDto, res: Response) {
    const manager = await this.managerRepo.findOne({
      where: { email: signInManagerDto.email },
    });

    if (!manager) {
      throw new BadRequestException("Manager topilmadi");
    }

    const isMatch = await bcrypt.compare(
      signInManagerDto.password,
      manager.password_hash
    );

    if (!isMatch) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(manager);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    manager.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    manager.is_active = true;
    await this.managerRepo.save(manager);

    return {
      message: "Manager tizimga kirdi",
      accessToken,
      refreshToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }

    await this.managerRepo.update(userData.id, {
      hashed_refresh_token: null,
    });

    res.clearCookie("refresh_token");
    return {
      message: "Manager tizimdan chiqdi",
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

    const manager = await this.managerRepo.findOne({ where: { id: payload.id } });
    if (!manager || !manager.hashed_refresh_token) {
      throw new UnauthorizedException("Token yoki manager topilmadi");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      manager.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(manager);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    manager.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await this.managerRepo.save(manager);

    return {
      message: "Tokenlar yangilandi",
      accessToken,
    };
  }
}
