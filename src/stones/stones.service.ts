import { Injectable } from '@nestjs/common';
import { CreateStoneDto } from './dto/create-stone.dto';
import { UpdateStoneDto } from './dto/update-stone.dto';

@Injectable()
export class StonesService {
  create(createStoneDto: CreateStoneDto) {
    return 'This action adds a new stone';
  }

  findAll() {
    return `This action returns all stones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stone`;
  }

  update(id: number, updateStoneDto: UpdateStoneDto) {
    return `This action updates a #${id} stone`;
  }

  remove(id: number) {
    return `This action removes a #${id} stone`;
  }
}
