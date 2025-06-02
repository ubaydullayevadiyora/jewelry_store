import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("stones")
export class Stone {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column("text")
  @ApiProperty()
  carat: string;

  @Column()
  @ApiProperty()
  color: string;

  @Column()
  @ApiProperty()
  shape: string;

  @Column()
  @ApiProperty()
  origin: string;
}
