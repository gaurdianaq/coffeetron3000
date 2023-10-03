import { Injectable } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import { ICoffeeEntry } from "./entities/coffeeEntry.entity";

@Injectable()
export class CoffeesService {
  constructor(
    private readonly contentfulService: ContentfulService<
      ICoffeeEntry,
      undefined
    >
  ) {}
}
