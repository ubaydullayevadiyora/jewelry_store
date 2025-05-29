import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Manager } from "./entities/manager.entity";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { ManagerService } from "./manager.service";

@Resolver(() => Manager)
export class ManagerResolver {
  constructor(private readonly managerService: ManagerService) {}

  @Mutation(() => Manager)
  createManager(@Args("createManagerInput") createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Query(() => [Manager], { name: "managers" })
  findAll() {
    return this.managerService.findAll();
  }

  @Query(() => Manager, { name: "manager" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.managerService.findOne(id);
  }

  @Mutation(() => Manager)
  updateManager(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateManagerInput") updateManagerDto: UpdateManagerDto
  ) {
    return this.managerService.update(id, updateManagerDto);
  }

  @Mutation(() => Manager)
  removeManager(@Args("id", { type: () => Int }) id: number) {
    return this.managerService.remove(id);
  }
}
