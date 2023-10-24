import { Injectable } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import { ICoffee, TAPIError } from "shared_types/types";
import { AlgoliaService } from "src/algolia/algolia.service";
import { SearchIndex } from "algoliasearch";
import { ICoffeeEntry } from "shared_types/componentContentfulTypes";
import { ResultAsync } from "neverthrow";

@Injectable()
export class CoffeesService {
  private algolaIndex: SearchIndex;
  private COFFEE_INDEX_NAME = "coffee-index";
  constructor(
    private readonly contentfulService: ContentfulService,
    private readonly algoliaService: AlgoliaService
  ) {}

  getOne(coffeeID: string): ResultAsync<ICoffee, TAPIError> {
    return this.contentfulService
      .getEntry<ICoffeeEntry>(coffeeID, {
        include: 2,
      })
      .map((coffee) => {
        return {
          name: coffee.fields.name,
          roast: coffee.fields.roast,
          richTextDescription: coffee.fields.richTextDescription,
          shortTextDescription: coffee.fields.shortTextDescription,
          brand: coffee.fields.brand.fields,
        };
      });
  }

  getAll(): ResultAsync<ICoffee[], TAPIError> {
    return this.contentfulService
      .getEntries<ICoffeeEntry>({
        content_type: "coffee",
      })
      .map((coffees) => {
        return coffees.items.map((coffee): ICoffee => {
          return {
            name: coffee.fields.name,
            roast: coffee.fields.roast,
            richTextDescription: coffee.fields.richTextDescription,
            shortTextDescription: coffee.fields.shortTextDescription,
            brand: coffee.fields.brand.fields,
          };
        });
      });
  }

  indexCoffee(coffeeID: string) {
    return this.contentfulService
      .getEntry<ICoffeeEntry>(coffeeID)
      .andThen((entry) => {
        return this.algoliaService.saveContentToIndex(this.COFFEE_INDEX_NAME, {
          objectID: entry.sys.id,
          name: entry.fields.name,
          roast: entry.fields.roast,
          shortTextDescription: entry.fields.shortTextDescription,
          brand: entry.fields.brand.fields.name,
        });
      });
  }

  async search(
    query: string,
    page: number = 1,
    pageSize: number = 10,
    offset: number = 0,
    locale: string = "en-US"
  ) {
    const results = await this.algolaIndex.search(query, {
      hitsPerPage: pageSize,
      page: page,
      offset: offset,
    });
    return results.hits;
  }
}
