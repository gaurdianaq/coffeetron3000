import { Module } from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { ContentfulModule } from "src/contentful/contentful.module";
import { CoffeesController } from './coffees.controller';

@Module({
  imports: [ContentfulModule],
  providers: [CoffeesService],
  controllers: [CoffeesController],
})
export class CoffeesModule {}
