import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Delivery } from "./entities/delivery.entity";
import { CreateDeliveryDto } from "./dto/create-delivery.dto";
import { UpdateDeliveryDto } from "./dto/update-delivery.dto";
import { Order } from "../orders/entities/order.entity";

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepo: Repository<Delivery>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>
  ) {}

  async create(dto: CreateDeliveryDto) {
    const order = await this.orderRepo.findOne({ where: { id: dto.order_id } });
    if (!order) throw new NotFoundException("Order not found");

    const delivery = this.deliveryRepo.create({
      ...dto,
      order,
    });

    return this.deliveryRepo.save(delivery);
  }

  findAll() {
    return this.deliveryRepo.find({ relations: ["order"] });
  }

  async findOne(id: number) {
    const delivery = await this.deliveryRepo.findOne({
      where: { id },
      relations: ["order"],
    });
    if (!delivery) throw new NotFoundException("Delivery not found");
    return delivery;
  }

  async update(id: number, dto: UpdateDeliveryDto) {
    const delivery = await this.deliveryRepo.findOneBy({ id });
    if (!delivery) throw new NotFoundException("Delivery not found");

    if (dto.order_id) {
      const order = await this.orderRepo.findOneBy({ id: dto.order_id });
      if (!order) throw new NotFoundException("Order not found");
      delivery.order = order;
    }

    Object.assign(delivery, dto);
    return this.deliveryRepo.save(delivery);
  }

  async remove(id: number) {
    const delivery = await this.deliveryRepo.findOneBy({ id });
    if (!delivery) throw new NotFoundException("Delivery not found");
    return this.deliveryRepo.remove(delivery);
  }
}
