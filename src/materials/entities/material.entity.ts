import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/entities/product.entity";

@Entity("materials")
export class Material {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  proba: number;

  @Column()
  @ApiProperty()
  color: string;

  @OneToMany(() => Product, (product) => product.material)
  products: Product[];
}
