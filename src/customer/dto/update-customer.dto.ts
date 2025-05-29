import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateCustomerDto } from "./create-customer.dto";

@InputType()
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @Field(() => Int)
  id: number;
}
