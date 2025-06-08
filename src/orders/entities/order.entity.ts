import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Customer } from "../../customer/entities/customer.entity";
import { Manager } from "../../manager/entities/manager.entity";
import { OrderItem } from "../../order_items/entities/order_item.entity";
import { Delivery } from "../../delivery/entities/delivery.entity";
import { Payment } from "../../payments/entities/payment.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column()
  manager_id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @ManyToOne(() => Manager, (manager) => manager.orders)
  manager: Manager;

  @Column("decimal")
  total_price: number;

  @Column({ type: "enum", enum: ["pending", "paid", "cancelled"] })
  status: string;

  @Column()
  pickup_code: string;

  @Column({ type: "timestamp" })
  pickup_code_expire_at: Date;

  @Column({ default: false })
  is_picked_up: boolean;

  @Column({ type: "timestamp", nullable: true })
  picked_up_at: Date;

  @Column({ type: "enum", enum: ["delivery", "pickup"] })
  delivery_option: string;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @OneToOne(() => Delivery, (delivery) => delivery.order)
  delivery: Delivery;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
