import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = request.params.id;

    const resource = await getOrderById(paramId); 

    if (user.role === "customer" && resource.customer_id !== user.id) {
      throw new ForbiddenException("Sizga bu resursga ruxsat yoq");
    }

    if (user.role === "manager" && resource.manager_id !== user.id) {
      throw new ForbiddenException("Siz bu buyurtmaga ulangan manager emassiz");
    }

    return true;
  }
}
