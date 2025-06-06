import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { Telegraf, Markup } from "telegraf";
import { OtpService } from "../common/services/otp.service";

@Injectable()
export class TelegramBotService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf<any>;

  constructor(private readonly otpService: OtpService) {}

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) throw new Error("TELEGRAM_BOT_TOKEN is missing");

    this.bot = new Telegraf(token);

    this.bot.start(async (ctx) => {
      // OtpService dan 6 xonali OTP olish
      const otp = this.otpService.generateOtp(6).toString().padStart(6, "0");

      await ctx.reply(
        "OTPni ko'rish uchun quyidagi tugmani bosing",
        Markup.inlineKeyboard([
          Markup.button.callback("OTPni ko'rsatish", `show_otp_${otp}`),
        ])
      );
    });

    this.bot.on("callback_query", async (ctx) => {
      const callbackQuery = ctx.callbackQuery;

      if (callbackQuery && "data" in callbackQuery && callbackQuery.data) {
        const callbackData = callbackQuery.data;

        if (callbackData.startsWith("show_otp_")) {
          const otp = callbackData.replace("show_otp_", "");
          await ctx.editMessageText(`Sizning OTP kodingiz: ||${otp}||`, {
            parse_mode: "MarkdownV2",
          });
          await ctx.answerCbQuery();
        }
      }
    });

    this.bot.launch();
  }

  onModuleDestroy() {
    this.bot.stop();
  }
}
