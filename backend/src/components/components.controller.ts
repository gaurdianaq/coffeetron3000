import { Controller, Get, Param } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";

@Controller("components")
export class ComponentsController {
  constructor(private readonly contentfulService: ContentfulService) {}

  @Get(":id")
  getComponent(@Param("id") id: string) {}
}
