import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  async sendMail(to: string, subject: string, text: string) {
    return await this.transporter.sendMail({
      from: '"My Jewelry Store" <your_email@gmail.com>',
      to,
      subject,
      text,
    });
  }
}
