import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("manager")
export class Manager {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Unikal ID" })
  id: number;

  @Field()
  @Column({ unique: true })
  @ApiProperty({ example: "Ali Valiyev", description: "Toliq ismi" })
  fullname: string;

  @Field()
  @Column({ unique: true })
  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  phone_number: string;

  @Field()
  @Column({ unique: true })
  @ApiProperty({
    example: "ali@example.com",
    description: "Elektron pochta manzili",
  })
  email: string;

  @Field()
  @Column()
  @ApiProperty({
    example: "hashedpassword123",
    description: "Parol hash qiymati",
  })
  password_hash: string;

  @Field()
  @Column({ type: "timestamp", nullable: true })
  @ApiProperty({
    example: "2025-06-01T12:00:00Z",
    description: "Oxirgi kirgan vaqti",
    required: false,
  })
  last_login: Date;

  @Field()
  @Column({ default: false })
  @ApiProperty({ example: true, description: "Faollik holati" })
  is_active: boolean;

  @Field()
  @Column({ nullable: true })
  @ApiProperty({
    example: "refresh_token_value",
    description: "Refresh token",
    required: false,
  })
  hashed_refresh_token: string | null;
}
