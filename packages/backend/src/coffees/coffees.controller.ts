import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from "@nestjs/common";
import { CoffeesService } from "./coffees.service";

@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coffeesService.getOne(id).match(
      (coffee) => {
        return coffee;
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }

  @Get("getCoffees")
  findAll() {
    return this.coffeesService.getAll().match(
      (coffees) => {
        return coffees;
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }

  @Post("indexCoffee")
  indexCoffee(@Body() coffeeEntry: { entryId: string }) {
    return this.coffeesService.indexCoffee(coffeeEntry.entryId).match(
      (response) => {
        return response;
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }
}
