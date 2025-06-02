import { Injectable } from "@nestjs/common";
import { Telegraf } from "telegraf";

@Injectable()
export class TelegramService {
  private readonly bot: Telegraf;

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error(
        "TELEGRAM_BOT_TOKEN is not defined in environment variables"
      );
    }

    this.bot = new Telegraf(token);
  }

  async sendOtpToTelegram(chatId: string, otp: number) {
    await this.bot.telegram.sendMessage(chatId, `Sizning OTP kodingiz: ${otp}`);
  }
}
