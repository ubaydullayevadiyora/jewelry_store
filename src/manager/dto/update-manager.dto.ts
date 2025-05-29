import { PartialType } from "@nestjs/mapped-types";
import { CreateManagerDto } from "./create-manager.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateManagerDto extends PartialType(CreateManagerDto) {
  @Field()
  id: number;
}
