import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StockHistory } from "./entities/stock_history.entity";
import { Stock } from "../stock/entities/stock.entity";
import { CreateStockHistoryDto } from "./dto/create-stock_history.dto";
import { UpdateStockHistoryDto } from "./dto/update-stock_history.dto";


@Injectable()
export class StockHistoryService {
  constructor(
    @InjectRepository(StockHistory)
    private historyRepo: Repository<StockHistory>,
    @InjectRepository(Stock)
    private stockRepo: Repository<Stock>
  ) {}

  async create(dto: CreateStockHistoryDto) {
    const stock = await this.stockRepo.findOneBy({ id: dto.stockId });
    if (!stock) throw new NotFoundException("Stock not found");

    const history = this.historyRepo.create({
      change: dto.change,
      reason: dto.reason,
      stock,
    });

    return this.historyRepo.save(history);
  }

  findAll() {
    return this.historyRepo.find({ relations: ["stock"] });
  }

  async findOne(id: number) {
    const history = await this.historyRepo.findOne({
      where: { id },
      relations: ["stock"],
    });
    if (!history) throw new NotFoundException("History not found");
    return history;
  }

  async update(id: number, dto: UpdateStockHistoryDto) {
    const history = await this.findOne(id);
    if (dto.stockId) {
      const stock = await this.stockRepo.findOneBy({ id: dto.stockId });
      if (!stock) throw new NotFoundException("Stock not found");
      history.stock = stock;
    }
    Object.assign(history, dto);
    return this.historyRepo.save(history);
  }

  async remove(id: number) {
    const history = await this.findOne(id);
    return this.historyRepo.remove(history);
  }
}
