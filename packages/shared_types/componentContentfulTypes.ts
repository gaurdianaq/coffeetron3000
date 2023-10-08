import { ICoffee, TLink } from "./types";
import { Entry } from "./contentfulTypes";

export interface ILinkEntry extends Entry<TLink> {}

export interface IDropDownEntry
  extends Entry<{
    label: string;
    navbarLinks: ILinkEntry[];
  }> {}

export type TNavItemEntry = ILinkEntry | IDropDownEntry;

export interface INavbarEntry {
  title: string;
  logoSrc?: string;
  navbarItems: TNavItemEntry[];
}

export interface ICoffeeEntry extends Entry<ICoffee> {}
