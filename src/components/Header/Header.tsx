import css from "./Header.module.css";
import Link from "next/link";
const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Logo">
        <svg width="138" height="16">
          <use href="/icons/icons.svg#icon-logo"></use>
        </svg>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
