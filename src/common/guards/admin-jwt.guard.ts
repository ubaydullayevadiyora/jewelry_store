import { AuthGuard } from "@nestjs/passport";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class AdminJwtGuard extends AuthGuard("admin-jwt") {
  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw (
        err ||
        new HttpException(
          "Avtorizatsiya qilinmagan foydalanuvchi",
          HttpStatus.UNAUTHORIZED
        )
      );
    }

    return user;
  }
}
