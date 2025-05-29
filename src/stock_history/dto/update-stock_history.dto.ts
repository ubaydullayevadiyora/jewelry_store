import { PartialType } from '@nestjs/mapped-types';
import { CreateStockHistoryDto } from './create-stock_history.dto';

export class UpdateStockHistoryDto extends PartialType(CreateStockHistoryDto) {}
