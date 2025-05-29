import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>
  ) {}

  create(dto: CreateAdminDto) {
    const admin = this.adminRepo.create(dto);
    return this.adminRepo.save(admin);
  }

  findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException("Admin not found");
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    await this.findOne(id); 
    await this.adminRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    return this.adminRepo.remove(admin);
  }
}
