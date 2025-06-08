import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { Stone } from "../stones/entities/stone.entity";
import { Category } from "../category/entities/category.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Stone)
    private readonly stoneRepo: Repository<Stone>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { stones: stoneIds, ...productData } = createProductDto;

    const stones = await this.stoneRepo.findBy({ id: In(stoneIds) });

    const product = this.productRepo.create({
      ...productData,
      stones,
    });

    return this.productRepo.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find({
      relations: ["category", "material", "stones"],
    });
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepo.findOne({
        where: { id },
        relations: ["category", "material", "stones"],
      });
      if (!product) throw new NotFoundException("Product not found");
      return product;
    } catch (error) {
      console.error("findOne error:", error);
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
    return { message: "Mahsulot o'chirildi" };
  }
}
