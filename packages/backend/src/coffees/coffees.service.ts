import { Injectable } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import { ICoffee } from "shared_types/types";

@Injectable()
export class CoffeesService {
  constructor(private readonly contentfulService: ContentfulService) {}

  async getOne(coffeeID: string): Promise<ICoffee> {
    const coffee = await this.contentfulService.getEntry<ICoffee>(coffeeID);
    console.log(coffee.fields);
    console.log(coffee.fields.richTextDescription);
    return coffee.fields;
  }

  async getAll() {
    const coffees = await this.contentfulService.getEntries<ICoffee>({
      content_type: "coffee",
    });

    return coffees.items.map((entry) => {
      return entry.fields;
    });
  }
}
