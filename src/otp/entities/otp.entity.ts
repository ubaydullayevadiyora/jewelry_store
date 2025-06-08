import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "otp_code" })
export class OtpCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  otp_code: string;

  @Column()
  otp_expire_at: Date;

  @Column({ default: false })
  is_used: boolean;
}
