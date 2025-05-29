import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Customer } from "./entities/customer.entity";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { CustomerService } from "./customer.service";

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => Customer)
  createCustomer(@Args("createCustomerInput") createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Query(() => [Customer], { name: "customers" })
  findAll() {
    return this.customerService.findAll();
  }

  @Query(() => Customer, { name: "customer" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.customerService.findOne(id);
  }

  @Mutation(() => Customer)
  updateCustomer(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateCustomerInput") updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Mutation(() => Customer)
  removeCustomer(@Args("id", { type: () => Int }) id: number) {
    return this.customerService.remove(id);
  }
}
