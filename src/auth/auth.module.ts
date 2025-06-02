import { Module } from "@nestjs/common";
import { AdminAuthController } from "./admin/admin-auth.controller";
import { AdminAuthService } from "./admin/admin-auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admins/admins.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "../admins/entities/admin.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME },
    }),
    AdminModule
  ],
  providers: [AdminAuthService],
  controllers: [AdminAuthController],
})
export class AuthModule {}

