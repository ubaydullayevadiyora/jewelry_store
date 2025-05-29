import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("admins")
export class Admin {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Field()
  @Column({ unique: true })
  @ApiProperty()
  username: string;

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
  password_hash: string;

  @Field()
  @Column({ type: "timestamp", nullable: true })
  @ApiProperty()
  last_login: Date;

  @Field()
  @Column({ default: false })
  @ApiProperty()
  is_super_admin: boolean;

  @Field()
  @Column({ nullable: true })
  @ApiProperty()
  refresh_token: string;
}
