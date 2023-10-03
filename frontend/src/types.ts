import { EntrySkeletonType } from "contentful";
import { List } from "immutable";

export type TLink = {
  label: string;
  target: string;
};

export type TDropDown = {
  label: string;
  links: TLink[];
};

export type TNavItem = TLink | TDropDown;

export interface INavbar extends EntrySkeletonType {
  fields: {
    logo: string;
    navbarItems: TNavItem[];
  };
}
