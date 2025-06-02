import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStoneDto } from "./dto/create-stone.dto";
import { UpdateStoneDto } from "./dto/update-stone.dto";
import { Stone } from "./entities/stone.entity";

@Injectable()
export class StonesService {
  constructor(
    @InjectRepository(Stone)
    private stoneRepo: Repository<Stone>
  ) {}

  create(dto: CreateStoneDto) {
    const stone = this.stoneRepo.create(dto);
    return this.stoneRepo.save(stone);
  }

  findAll() {
    return this.stoneRepo.find();
  }

  async findOne(id: number) {
    const stone = await this.stoneRepo.findOne({ where: { id } });
    if (!stone) throw new NotFoundException("Stone not found");
    return stone;
  }

  async update(id: number, dto: UpdateStoneDto) {
    const stone = await this.findOne(id);
    const updated = Object.assign(stone, dto);
    return this.stoneRepo.save(updated);
  }

  async remove(id: number) {
    const stone = await this.findOne(id);
    return this.stoneRepo.remove(stone);
  }
}
