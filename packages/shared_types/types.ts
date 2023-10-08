import { Document } from "@contentful/rich-text-types";
export type TLink = {
  label: string;
  target: string;
};

export type TDropDown = {
  label: string;
  navbarLinks: TLink[];
};

export type TNavItem = TLink | TDropDown;

export interface INavbarProps {
  logoSrc?: string; //Image source for logo
  navItems?: TNavItem[];
}

export interface ICoffee {
  name: string;
  roast: string;
  richTextDescription: Document; //need to figure out what to type this as, there seems to be a document type, but it's not exported
}
