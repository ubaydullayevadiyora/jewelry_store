// src/customers/customer.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>
  ) {}

  // async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
  //   // Email allaqachon mavjudligini tekshirish
  //   const existingCustomer = await this.customerRepo.findOne({
  //     where: { email: createCustomerDto.email },
  //   });
  //   if (existingCustomer) {
  //     throw new ConflictException("Email already registered");
  //   }

  //   // Parolni hash qilish
  //   const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);

  //   // Yangi mijoz yaratish
  //   const customer = this.customerRepo.create({
  //     ...createCustomerDto,
  //     password: hashedPassword,
  //   });

  //   return this.customerRepo.save(customer);
  // }

  async findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customerRepo.findOne({ where: { email } });
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    const customer = await this.findOne(id);

    // Agar parol yangilanayotgan bo‘lsa, uni hash qilamiz
    if (updateCustomerDto.password) {
      updateCustomerDto.password = await bcrypt.hash(
        updateCustomerDto.password,
        10
      );
    }

    Object.assign(customer, updateCustomerDto);
    return this.customerRepo.save(customer);
  }

  async remove(id: number): Promise<Customer> {
    const customer = await this.findOne(id);
    return this.customerRepo.remove(customer);
  }
}
