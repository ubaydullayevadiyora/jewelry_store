import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TelegramBotService } from "./bot.service";
import { ServiceModule } from "../common/services/service.module";

@Module({
  imports: [ConfigModule, ServiceModule], 
  providers: [TelegramBotService],
  exports: [TelegramBotService], 
})
export class TelegramBotModule {}
