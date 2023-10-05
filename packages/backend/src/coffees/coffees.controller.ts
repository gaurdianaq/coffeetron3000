import { Controller, Get, Param } from "@nestjs/common";
import { CoffeesService } from "./coffees.service";

@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get("getCoffee/:id")
  findOne(@Param("id") id: string) {
    return this.coffeesService.getOne(id);
  }

  @Get("getCoffees")
  findAll() {
    return this.coffeesService.getAll();
  }
}
