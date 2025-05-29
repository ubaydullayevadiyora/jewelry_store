import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AdminService } from "./admins.service";
import { Admin } from "./entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => Admin)
  createAdmin(@Args("createAdminInput") createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Query(() => [Admin], { name: "admins" })
  findAll() {
    return this.adminService.findAll();
  }

  @Query(() => Admin, { name: "admin" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  updateAdmin(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateAdminInput") updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Mutation(() => Admin)
  removeAdmin(@Args("id", { type: () => Int }) id: number) {
    return this.adminService.remove(id);
  }
}
