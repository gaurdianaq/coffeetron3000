import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { TCoffeeHit } from "shared_types/types";

@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get("searchCoffee")
  searchCoffee(
    @Query() query: { searchQuery: string; page: number; pageSize: number }
  ) {
    return this.coffeesService
      .search(query.searchQuery, query.page, query.pageSize)
      .match(
        (results) => {
          console.log(results);
          return results.hits.map((hit): TCoffeeHit => {
            return {
              objectID: hit.objectID,
              name: hit.name,
              brand: hit.brand,
              shortDescription: hit.shortDescription,
              roast: hit.roast,
            };
          });
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
