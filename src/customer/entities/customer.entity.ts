import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("customer")
export class Customer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Field()
  @Column({ unique: true })
  @ApiProperty()
  firstname: string;

  @Field()
  @Column({ unique: true })
  @ApiProperty()
  lastname: string;

  @Field()
  @Column({ unique: true })
  @ApiProperty()
  phone_number: string;

  @Field()
  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Field()
  @Column()
  @ApiProperty()
  address: string;

  @Field()
  @Column()
  @ApiProperty()
  birth_date: string;

  @Field()
  @Column()
  @ApiProperty()
  password_hash: string;

  @Field()
  @Column({ type: "timestamp", nullable: true })
  @ApiProperty()
  last_login: Date;

  @Field()
  @Column({ default: false })
  @ApiProperty()
  is_active: boolean;

  @Field()
  @Column({ default: false })
  @ApiProperty()
  is_verified: boolean;

  @Field()
  @Column({ nullable: true })
  @ApiProperty()
  refresh_token: string;
}
