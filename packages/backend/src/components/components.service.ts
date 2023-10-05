import { Injectable } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import { INavbarEntry, TNavItemEntry } from "shared_types/componentTypes";

@Injectable()
export class ComponentsService {
  constructor(private readonly contentfulService: ContentfulService) {}

  getComponentProps(componentId: string) {
    switch (componentId) {
      case "navbar":
        return this.getNavbarProps();
    }
  }

  //TODO figure out how to get the typing of this working as expected
  private async getNavbarProps(navbarTitle: string = "MainNav") {
    const navbarEntry = await this.contentfulService.getEntries<INavbarEntry>({
      content_type: "navbar",
      "fields.title": navbarTitle,
      include: 2,
    });

    return {
      navItems: navbarEntry.items[0].fields.navbarItems.map(
        (navItem: TNavItemEntry) => {
          if ("navbarLinks" in navItem.fields) {
            return {
              label: navItem.fields.label,
              links: navItem.fields.navbarLinks.map((navBarLink) => {
                return navBarLink.fields;
              }),
            };
          }
          return navItem.fields;
        }
      ),
    };
  }
}
