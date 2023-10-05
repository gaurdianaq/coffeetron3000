import { EntrySkeletonType } from "contentful";

export type TLink = {
  label: string;
  target: string;
};

export type TDropDown = {
  label: string;
  links: TLink[];
};

export type TNavItem = TLink | TDropDown;

export interface INavbar {
  logo: string;
  navItems: TNavItem[];
}
