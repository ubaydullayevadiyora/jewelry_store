import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StonesService } from "./stones.service";
import { StonesController } from "./stones.controller";
import { Stone } from "./entities/stone.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Stone])],
  controllers: [StonesController],
  providers: [StonesService],
})
export class StonesModule {}
