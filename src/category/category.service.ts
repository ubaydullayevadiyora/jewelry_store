import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>
  ) {}

  create(dto: CreateCategoryDto) {
    const category = this.repo.create(dto);
    return this.repo.save(category);
  }

  findAll() {
    return this.repo.find({ relations: ["products"] });
  }

  async findOne(id: number) {
    const category = await this.repo.findOne({
      where: { id },
      relations: ["products"],
    });
    if (!category) throw new NotFoundException("Category not found");
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    Object.assign(category, dto);
    return this.repo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.repo.remove(category);
  }
}
