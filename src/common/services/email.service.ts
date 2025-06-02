import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io", // misol uchun
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendOtp(email: string, otp: number) {
    await this.transporter.sendMail({
      from: '"Your Store" <no-reply@yourstore.com>',
      to: email,
      subject: "Tasdiqlash kodi",
      text: `Sizning OTP kodingiz: ${otp}`,
    });
  }
}
