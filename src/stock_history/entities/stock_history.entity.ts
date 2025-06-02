import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Stock } from "../../stock/entities/stock.entity";

@Entity("stock_histories")
export class StockHistory {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  change: number;

  @Column()
  @ApiProperty()
  reason: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @ManyToOne(() => Stock)
  @JoinColumn({ name: "stock_id" })
  @ApiProperty({ type: () => Stock })
  stock: Stock;
}
