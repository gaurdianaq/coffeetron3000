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
