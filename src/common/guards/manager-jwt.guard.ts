import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class ManagerJwtGuard extends AuthGuard("manager-jwt") {}
