import { Controller, Get, HttpException, Param } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import { ComponentsService } from "./components.service";
import { INavbarProps, TAPIResponseMessage } from "shared_types/types";

@Controller("components")
export class ComponentsController {
  constructor(private readonly componentService: ComponentsService) {}

  @Get(":id")
  async getComponent(@Param("id") id: string) {
    return await this.componentService
      .getComponentProps(id)
      .match<INavbarProps>(
        (props) => {
          return props;
        },
        (error) => {
          throw new HttpException(error.message, error.statusCode);
        }
      );
  }
}
