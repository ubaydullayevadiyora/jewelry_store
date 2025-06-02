import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminService } from "./admins.service";

@ApiTags("Admins")
@Controller("admins")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiResponse({ status: 201, description: "Admin muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Notog'ri ma'lumot" })
  @ApiBody({ type: CreateAdminDto })
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({ status: 200, description: "Barcha adminlar ro'yxati" })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID boyicha bitta adminni olish" })
  @ApiParam({ name: "id", type: Number, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan admin" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Adminni yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Admin yangilandi" })
  @ApiBody({ type: UpdateAdminDto })
  update(@Param("id") id: string, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Adminni ochirish" })
  @ApiParam({ name: "id", type: Number, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Admin ochirildi" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
