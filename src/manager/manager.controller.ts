import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { Manager } from "./entities/manager.entity";
import { Roles } from "../common/decorators/roles.decorator";
import { ManagerJwtGuard } from "../common/guards/manager-jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Role } from "../common/enums/role.enum";
import { AdminJwtGuard } from "../common/guards/admin-jwt.guard";

@ApiTags("Managers")
@Controller("manager")
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: "Yangi manager yaratish" })
  @ApiResponse({
    status: 201,
    description: "Manager muvaffaqiyatli yaratildi",
    type: Manager,
  })
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: "Barcha managerlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Managerlar royxati",
    type: [Manager],
  })
  findAll() {
    return this.managerService.findAll();
  }

  @UseGuards(AdminJwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(":id")
  @ApiOperation({ summary: "ID boyicha managerni olish" })
  @ApiParam({ name: "id", type: Number, description: "Manager ID" })
  @ApiResponse({
    status: 200,
    description: "Manager topildi",
    type: Manager,
  })
  findOne(@Param("id") id: string) {
    return this.managerService.findOne(+id);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Patch(":id")
  @ApiOperation({ summary: "Manager malumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Manager muvaffaqiyatli yangilandi",
    type: Manager,
  })
  update(@Param("id") id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(+id, updateManagerDto);
  }

  @UseGuards(ManagerJwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Delete(":id")
  @ApiOperation({ summary: "Managerni ochirish" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Manager muvaffaqiyatli ochirildi",
  })
  remove(@Param("id") id: string) {
    return this.managerService.remove(+id);
  }
}
