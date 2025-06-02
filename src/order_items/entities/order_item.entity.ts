import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../../orders/entities/order.entity";
import { Product } from "../../products/entities/product.entity";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  @ApiProperty({ type: () => Order })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  @ApiProperty({ type: () => Product })
  product: Product;
}
