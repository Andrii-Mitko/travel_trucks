"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCatalog = pathname.startsWith("/catalog");

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" aria-label="Logo" className={css.link}>
          <svg width="136" height="16" aria-hidden="true">
            <use href="/icons/icons.svg#icon-logo"></use>
          </svg>
        </Link>

        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link
                href="/"
                className={isHome ? css.activeLink : css.navLink}
                aria-current={isHome ? "page" : undefined}
                aria-disabled={isHome}
                tabIndex={isHome ? -1 : 0}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/catalog"
                className={isCatalog ? css.activeLink : css.navLink}
                aria-current={isCatalog ? "page" : undefined}
                aria-disabled={isCatalog}
                tabIndex={isCatalog ? -1 : 0}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
