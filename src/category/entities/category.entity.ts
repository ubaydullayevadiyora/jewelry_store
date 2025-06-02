import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/entities/product.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  @ApiProperty({ type: () => [Product], required: false })
  products: Product[];
}
