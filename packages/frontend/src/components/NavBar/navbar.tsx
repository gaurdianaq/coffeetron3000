import { TNavItem } from "@/types";
import { List } from "immutable";
import Link from "next/link";

export interface INavbarProps {
  logoSrc?: string; //Image source for logo
  navItems?: TNavItem[];
}

export const Navbar = ({ navItems }: INavbarProps) => {
  console.log("navItems in navbar component", navItems);
  console.log("typeoof navItems", typeof navItems);
  //@ts-ignore
  console.log(navItems.navItems);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-burger" />
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          {navItems &&
            navItems.map((navItem) => {
              console.log("navItem", navItem);
              if ("links" in navItem) {
                console.log("typeof links", typeof navItem.links);
                return (
                  <div
                    key={navItem.label}
                    className="navbar-item has-dropdown is-hoverable"
                  >
                    <div className="navbar-item">{navItem.label}</div>
                    <div className="navbar-dropdown">
                      {navItem.links.map((link) => {
                        return (
                          <Link
                            key={navItem.label}
                            className="navbar-item"
                            href={link.target}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={navItem.label}
                  className="navbar-item"
                  href={navItem.target}
                >
                  {navItem.label}
                </Link>
              );
            })}
        </div>
      </div>
    </nav>
  );
};
