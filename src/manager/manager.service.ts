import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Manager } from "./entities/manager.entity";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly adminRepo: Repository<Manager>
  ) {}

  async create(dto: CreateManagerDto) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(dto.password_hash, saltRounds);

    const admin = this.adminRepo.create({
      ...dto,
      password_hash: hashedPassword, 
    });

    return this.adminRepo.save(admin);
  }

  findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException("Manager not found");
    return admin;
  }

  async update(id: number, dto: UpdateManagerDto) {
    await this.findOne(id);
    await this.adminRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    return this.adminRepo.remove(admin);
  }
}
