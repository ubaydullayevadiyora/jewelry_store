import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { OrderItem } from "../../order_items/entities/order_item.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  customer_name: string;

  @Column()
  @ApiProperty()
  customer_phone: string;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  @ApiProperty({ type: () => [OrderItem] })
  items: OrderItem[];
}
