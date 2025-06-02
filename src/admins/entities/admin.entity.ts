import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  username: string;

  @Column({ unique: true })
  @ApiProperty()
  phone_number: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password_hash: string;

  @Column({ type: "timestamp", nullable: true })
  @ApiProperty()
  last_login: Date;

  @Column({ default: false })
  @ApiProperty()
  is_super_admin: boolean;

  @Column({ default: false })
  @ApiProperty()
  is_active: boolean;

  @Column({ type: "text", nullable: true })
  @ApiProperty()
  hashed_refresh_token: string | null;
}
