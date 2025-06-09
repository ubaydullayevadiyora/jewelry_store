import { AuthGuard } from "@nestjs/passport";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class CustomerJwtGuard extends AuthGuard("customer-jwt") {
  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw (
        err ||
        new HttpException(
          "Avtorizatsiya qilinmagan customer",
          HttpStatus.UNAUTHORIZED
        )
      );
    }

    return user;
  }
}
