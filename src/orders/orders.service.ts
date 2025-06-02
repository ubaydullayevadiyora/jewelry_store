import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import { OrderItem } from "../order_items/entities/order_item.entity";
import { Product } from "../products/entities/product.entity";


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private itemRepo: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>
  ) {}

  async create(dto: CreateOrderDto) {
    const order = this.orderRepo.create({
      customer_name: dto.customer_name,
      customer_phone: dto.customer_phone,
      items: [],
    });

    for (const item of dto.items) {
      const product = await this.productRepo.findOneBy({ id: item.product_id });
      if (!product)
        throw new NotFoundException(`Product ${item.product_id} not found`);
      const orderItem = this.itemRepo.create({
        product,
        quantity: item.quantity,
      });
      order.items.push(orderItem);
    }

    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({ relations: ["items", "items.product"] });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ["items", "items.product"],
    });
    if (!order) throw new NotFoundException("Order not found");
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.findOne(id);
    Object.assign(order, dto);
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderRepo.remove(order);
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: [
        "customer",
        "manager",
        "order_items",
        "order_items.product",
        "payment",
        "delivery",
      ],
    });

    if (!order) {
      throw new NotFoundException(`Buyurtma topilmadi (ID: ${id})`);
    }

    return order;
  }
}
