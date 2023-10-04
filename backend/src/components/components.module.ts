import { Module } from "@nestjs/common";
import { ComponentsController } from "./components.controller";
import { ContentfulModule } from "src/contentful/contentful.module";

@Module({
  imports: [ContentfulModule],
  controllers: [ComponentsController],
})
export class ComponentsModule {}
