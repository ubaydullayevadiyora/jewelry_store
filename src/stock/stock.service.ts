import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { Stock } from "./entities/stock.entity";
import { Product } from "../products/entities/product.entity";

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stockRepo: Repository<Stock>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>
  ) {}

  async create(dto: CreateStockDto) {
    const product = await this.productRepo.findOne({
      where: { id: dto.product_id },
    });
    if (!product) throw new NotFoundException("Product not found");

    const stock = this.stockRepo.create({
      quantity: dto.quantity,
      product,
    });
    return this.stockRepo.save(stock);
  }

  findAll() {
    return this.stockRepo.find();
  }

  async findOne(id: number) {
    const stock = await this.stockRepo.findOne({ where: { id } });
    if (!stock) throw new NotFoundException("Stock not found");
    return stock;
  }

  async update(id: number, dto: UpdateStockDto) {
    const stock = await this.findOne(id);
    if (dto.product_id) {
      const product = await this.productRepo.findOne({
        where: { id: dto.product_id },
      });
      if (!product) throw new NotFoundException("Product not found");
      stock.product = product;
    }
    stock.quantity = dto.quantity ?? stock.quantity;
    return this.stockRepo.save(stock);
  }

  async remove(id: number) {
    const stock = await this.findOne(id);
    return this.stockRepo.remove(stock);
  }
}
