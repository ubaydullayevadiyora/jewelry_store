import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, "admin-jwt") {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET_KEY")!,
    });
  }

  async validate(payload: any) {
    console.log('JWT PAYLOAD:', payload);
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      is_super_admin: payload.is_super_admin,
    };
  }
}
