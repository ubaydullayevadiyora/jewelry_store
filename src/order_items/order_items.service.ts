import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItem } from "./entities/order_item.entity";
import { Order } from "../orders/entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { CreateOrderItemDto } from "./dto/create-order_item.dto";
import { UpdateOrderItemDto } from "./dto/update-order_item.dto";

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private itemRepo: Repository<OrderItem>,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>
  ) {}

  async create(dto: CreateOrderItemDto) {
    const order = await this.orderRepo.findOneBy({ id: dto.orderId });
    if (!order) throw new NotFoundException("Order not found");

    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) throw new NotFoundException("Product not found");

    const item = this.itemRepo.create({
      quantity: dto.quantity,
      order,
      product,
    });

    return this.itemRepo.save(item);
  }

  findAll() {
    return this.itemRepo.find({ relations: ["order", "product"] });
  }

  async findOne(id: number) {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ["order", "product"],
    });
    if (!item) throw new NotFoundException("Order item not found");
    return item;
  }

  async update(id: number, dto: UpdateOrderItemDto) {
    const item = await this.findOne(id);

    if (dto.orderId) {
      const order = await this.orderRepo.findOneBy({ id: dto.orderId });
      if (!order) throw new NotFoundException("Order not found");
      item.order = order;
    }

    if (dto.productId) {
      const product = await this.productRepo.findOneBy({ id: dto.productId });
      if (!product) throw new NotFoundException("Product not found");
      item.product = product;
    }

    Object.assign(item, dto);
    return this.itemRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.itemRepo.remove(item);
  }
}
