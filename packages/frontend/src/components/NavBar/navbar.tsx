import Link from "next/link";

//TODO import this properly as an actual package once I figure out why the heck next can't find this
import { INavbarProps } from "../../../../shared_types/types";

export const Navbar = ({ navbarItems }: INavbarProps) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="myNavbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="myNavbar" className="navbar-menu">
        <div className="navbar-start">
          {navbarItems &&
            navbarItems.map((navItem) => {
              if ("navbarLinks" in navItem) {
                return (
                  <div
                    key={navItem.label}
                    className="navbar-item has-dropdown is-hoverable"
                  >
                    <div className="navbar-item">{navItem.label}</div>
                    <div className="navbar-dropdown">
                      {navItem.navbarLinks.map((link) => {
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
