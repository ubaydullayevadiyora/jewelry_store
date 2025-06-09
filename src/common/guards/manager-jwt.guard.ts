import { AuthGuard } from "@nestjs/passport";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class ManagerJwtGuard extends AuthGuard("manager-jwt") {
  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw (
        err ||
        new HttpException(
          "Avtorizatsiya qilinmagan manager",
          HttpStatus.UNAUTHORIZED
        )
      );
    }

    return user;
  }
}
