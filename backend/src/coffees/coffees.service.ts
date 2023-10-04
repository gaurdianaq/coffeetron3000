import { Inject, Injectable } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import { ICoffeeEntry } from "./entities/coffeeEntry.entity";
import { ICoffee } from "./entities/coffee.entity";

@Injectable()
export class CoffeesService {
  constructor(private readonly contentfulService: ContentfulService) {}

  async getOne(coffeeID: string): Promise<ICoffee> {
    const coffee = await this.contentfulService.getEntry<
      ICoffeeEntry,
      undefined
    >(coffeeID);
    return coffee.fields as ICoffee;
  }

  async getAll() {
    const coffees = await this.contentfulService.getEntries<
      ICoffeeEntry,
      undefined
    >({
      content_type: "coffee",
    });

    return coffees.items.map((entry) => {
      return entry.fields as ICoffee;
    });
  }
}
