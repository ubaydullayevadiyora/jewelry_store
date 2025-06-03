import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/entities/product.entity";

@Entity("stones")
export class Stone {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column("decimal")
  @ApiProperty()
  carat: number;

  @Column()
  @ApiProperty()
  color: string;

  @ManyToMany(() => Product, (product) => product.stones)
  products: Product[];
}
