import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";
import { Material } from "./entities/material.entity";

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialRepo: Repository<Material>
  ) {}

  create(dto: CreateMaterialDto) {
    const material = this.materialRepo.create(dto);
    return this.materialRepo.save(material);
  }

  findAll() {
    return this.materialRepo.find({ relations: ["products"] });
  }

  async findOne(id: number) {
    const material = await this.materialRepo.findOne({
      where: { id },
      relations: ["products"],
    });
    if (!material) throw new NotFoundException("Material not found");
    return material;
  }

  async update(id: number, dto: UpdateMaterialDto) {
    const material = await this.findOne(id);
    const updated = Object.assign(material, dto);
    return this.materialRepo.save(updated);
  }

  async remove(id: number) {
    const material = await this.findOne(id);
    return this.materialRepo.remove(material);
  }
}
