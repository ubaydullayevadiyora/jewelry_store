import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "../../orders/entities/order.entity";

export enum DeliveryType {
  HOME = "home",
  PICKUP = "pickup",
}

export enum DeliveryStatus {
  PENDING = "pending",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
}

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: DeliveryType })
  delivery_type: DeliveryType;

  @Column({ type: "varchar", nullable: true })
  address: string;

  @Column({ type: "enum", enum: DeliveryStatus })
  status: DeliveryStatus;

  @Column({ type: "decimal" })
  delivery_price: number;

  @Column({ type: "timestamp" })
  delivery_at: Date;

  @OneToOne(() => Order, (order) => order.delivery, { onDelete: "CASCADE" })
  @JoinColumn()
  order: Order;
}
