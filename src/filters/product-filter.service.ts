import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../products/entities/product.entity";
import { Stone } from "../stones/entities/stone.entity";
import { Category } from "../category/entities/category.entity";
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from "typeorm";

@Injectable()
export class GetProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
    // @InjectRepository(Stone)
    // private readonly stoneRepo: Repository<Stone>,
    // @InjectRepository(Category)
    // private readonly categoryRepo: Repository<Category>
  ) {}

  async getProductsByPriceRange(minPrice?: number, maxPrice?: number) {
    const where: any = {};

    if (minPrice !== undefined && maxPrice !== undefined) {
      where.price = Between(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
      where.price = MoreThanOrEqual(minPrice);
    } else if (maxPrice !== undefined) {
      where.price = LessThanOrEqual(maxPrice);
    }

    return this.productRepo.find({
      where,
    });
  }

  async getProductsByProba(filter: { proba?: string }) {
    const query = this.productRepo
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.material", "material");

    if (filter.proba) {
      query.andWhere("material.proba LIKE :proba", {
        proba: `%${filter.proba}%`,
      });
    }

    return query.getMany();
  }

  async getProductsByMaterialName(materialName?: string) {
    if (!materialName) {
      return this.productRepo.find({
        relations: ["material"],
      });
    }

    return this.productRepo.find({
      relations: ["material"],
      where: {
        material: {
          name: materialName,
        },
      },
    });
  }

  async getProductsBySizeAndCategory(
    minSize?: number,
    maxSize?: number,
    categoryId?: number
  ) {
    const where: any = {};

    // Size filter
    if (minSize !== undefined && maxSize !== undefined) {
      where.size = Between(minSize, maxSize);
    } else if (minSize !== undefined) {
      where.size = MoreThanOrEqual(minSize);
    } else if (maxSize !== undefined) {
      where.size = LessThanOrEqual(maxSize);
    }

    // Category filter
    if (categoryId !== undefined) {
      where.category = { id: categoryId };
    }

    return this.productRepo.find({
      where,
      relations: ["material", "category"],
    });
  }
}
