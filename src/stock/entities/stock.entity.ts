import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/entities/product.entity";

@Entity("stocks")
export class Stock {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  quantity: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.stocks, { eager: true })
  @JoinColumn({ name: "product_id" })
  @ApiProperty({ type: () => Product })
  product: Product;
}
