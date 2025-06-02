import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
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

  @Column()
  @ApiProperty()
  stone_id: number;

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

  @Column()
  @ApiProperty()
  image_url: string;

  @Column({ default: true })
  @ApiProperty()
  is_active: boolean;

  @ManyToOne(() => Material, (material) => material.products)
  @JoinColumn({ name: "material_id" })
  material: Material;

  @ManyToOne(() => Stone)
  @JoinColumn({ name: "stone_id" })
  stone: Stone;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => Stock, (stock) => stock.product)
  stocks: Stock[];
}
