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
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const now = new Date();
    const expireAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const pickupCode = this.generatePickupCode();

    // Avval orderni yaratamiz
    const orderData = {
      ...dto,
      pickup_code: pickupCode,
      pickup_code_expire_at: expireAt,
      is_picked_up: false,
    };

    const order = this.orderRepo.create(orderData);
    await this.orderRepo.save(order);

    // Order item-larni yaratamiz (agar DTO ichida items bo‘lsa)
    if ("items" in dto && Array.isArray(dto.items)) {
      for (const item of dto.items) {
        const product = await this.productRepo.findOneByOrFail({
          id: item.product_id,
        });

        const orderItem = this.orderItemRepo.create({
          order: { id: order.id },
          product: { id: item.product_id },
          quantity: item.quantity,
          price_at_order_time: product.price, // MUHIM QISM!
        });

        await this.orderItemRepo.save(orderItem);
      }
    }

    return order;
  }

  private generatePickupCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
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
    const order = await this.orderRepo.findOne({
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
