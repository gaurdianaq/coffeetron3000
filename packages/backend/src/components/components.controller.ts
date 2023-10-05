import { Controller, Get, Param } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import { ComponentsService } from "./components.service";

@Controller("components")
export class ComponentsController {
  constructor(private readonly componentService: ComponentsService) {}

  @Get(":id")
  async getComponent(@Param("id") id: string) {
    const props = await this.componentService.getComponentProps(id);
    console.log(props);
    return props;
  }
}
