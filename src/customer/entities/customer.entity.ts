import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("customer")
export class Customer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Customer ID" })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: "Ali", description: "Ism (firstname)" })
  firstname: string;

  @Column({ unique: true })
  @ApiProperty({ example: "Valiyev", description: "Familiya (lastname)" })
  lastname: string;

  @Column({ unique: true })
  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  phone_number: string;

  @Column({ unique: true })
  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  email: string;

  @Column()
  @ApiProperty({ example: "Toshkent, Chilonzor", description: "Manzil" })
  address: string;

  @Column()
  @ApiProperty({
    example: "2000-05-15",
    description: "Tug'ilgan sana (ISO format)",
  })
  birth_date: string;

  @Column()
  @ApiProperty({
    example: "hashed_password123",
    description: "Parol (hash holatda)",
  })
  password: string;

  @Column()
  @ApiProperty({
    example: "hashed_password123",
    description: "Parol (hash holatda)",
  })
  confirm_password: string;

  @Column({ type: "timestamp", nullable: true })
  @ApiProperty({
    example: "2024-12-31T23:59:59.000Z",
    description: "Oxirgi kirish sanasi",
  })
  last_login: Date;

  @Column({ default: false })
  @ApiProperty({ example: false, description: "Faollik holati" })
  is_active: boolean;

  @Column({ default: false })
  @ApiProperty({ example: false, description: "Tasdiqlanganmi" })
  is_verified: boolean;

  @Column({ type: "text", nullable: true })
  @ApiProperty({
    example: "refresh_token_string",
    description: "Refresh token",
  })
  hashed_refresh_token: string | null;

  @Column({ type: "varchar", nullable: true })
  otp_code: string | null;

  @Column({ type: "timestamp", nullable: true })
  otp_expire_at: Date | null;

  @Column({ nullable: true })
  telegram_id: string;
}
