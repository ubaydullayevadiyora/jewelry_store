import { InputType, Field, PartialType } from "@nestjs/graphql";
import { CreateAdminDto } from "./create-admin.dto";

@InputType()
export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @Field()
  id: number;
}
