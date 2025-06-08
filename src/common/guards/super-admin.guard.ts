import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log("REQ USER:", user); 

    if (!user || user.role !== "admin" || user.is_super_admin !== true) {
      throw new ForbiddenException(
        "Only super admins can access this resource."
      );
    }

    return true;
  }
}
