import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Material } from "../../materials/entities/material.entity";
import { Stone } from "../../stones/entities/stone.entity";
import { Category } from "../../category/entities/category.entity";
import { Stock } from "../../stock/entities/stock.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  material_id: number;

  // @Column()
  // @ApiProperty()
  // stone_id: number;

  @Column()
  @ApiProperty()
  category_id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column("text")
  @ApiProperty()
  description: string;

  @Column("decimal")
  @ApiProperty()
  price: number;

  @Column("decimal")
  @ApiProperty()
  weight: number;

  @Column("decimal")
  @ApiProperty()
  size: number;

  @Column()
  @ApiProperty()
  image_url: string;

  @Column({ default: true })
  @ApiProperty()
  is_active: boolean;

  // stone: number[];

  @ManyToOne(() => Material, (material) => material.products)
  @JoinColumn({ name: "material_id" })
  material: Material;

  // @ManyToOne(() => Stone)
  // @JoinColumn({ name: "stone_id" })
  // stone: Stone;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => Stock, (stock) => stock.product)
  stocks: Stock[];

  @ManyToMany(() => Stone, { cascade: true })
  @JoinTable({
    name: "product_stones",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "stone_id",
      referencedColumnName: "id",
    },
  })
  stones: Stone[];
}
