import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "../../orders/entities/order.entity";

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum PaymentType {
  CARD = "card",
  CASH = "cash",
  TRANSFER = "transfer",
}

@Entity("payment")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @ManyToOne(() => Order, (order) => order.payments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "timestamp", nullable: true })
  paid_at: Date;

  @Column({ type: "enum", enum: PaymentStatus })
  status: PaymentStatus;

  @Column({ type: "enum", enum: PaymentType })
  type: PaymentType;
}
