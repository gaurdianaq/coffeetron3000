import { Module } from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { ContentfulModule } from "src/contentful/contentful.module";

@Module({
  imports: [ContentfulModule],
  providers: [CoffeesService],
})
export class CoffeesModule {}
