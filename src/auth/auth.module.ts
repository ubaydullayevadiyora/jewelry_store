import { Module } from "@nestjs/common";
import { AdminAuthController } from "./admin/admin-auth.controller";
import { AdminAuthService } from "./admin/admin-auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admins/admins.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "../admins/entities/admin.entity";
import { CustomerModule } from "../customer/customer.module";
import { ManagerModule } from "../manager/manager.module";
import { Customer } from "../customer/entities/customer.entity";
import { Manager } from "../manager/entities/manager.entity";
import { CustomerAuthService } from "./customer/customer-auth.service";
import { ManagerAuthService } from "./manager/manager-auth.service";
import { CustomerAuthController } from "./customer/customer-auth.controller";
import { ManagerAuthController } from "./manager/manager-auth.controller";
import { AdminJwtStrategy } from "./strategies/admin-jwt.strategy";
import { OtpModule } from "../otp/otp.module";
import { MailServiceModule } from "../common/services/email-service.module";
import { CustomerJwtStrategy } from "./strategies/customer-jwt.strategy";
import { ManagerJwtStrategy } from "./strategies/manager-jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Customer, Manager]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_SECRET_KEY },
    }),
    AdminModule,
    CustomerModule,
    ManagerModule,
    OtpModule,
    MailServiceModule,
  ],
  providers: [
    AdminAuthService,
    CustomerAuthService,
    ManagerAuthService,
    AdminJwtStrategy,
    CustomerJwtStrategy,
    ManagerJwtStrategy,
  ],
  controllers: [
    AdminAuthController,
    CustomerAuthController,
    ManagerAuthController,
  ],
})
export class AuthModule {}
