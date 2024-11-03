import Link from "next/link";
import styles from "../styles/Home.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.headerLink}`}>
          Home
        </Link>
        <Link href="/ingredients" className={`${styles.headerLink}`}>
          Ingredients
        </Link>
        <Link href="/recipes" className={`${styles.headerLink}`}>
          Recipes
        </Link>
        <Link href="/reviews" className={`${styles.headerLink}`}>
          Reviews
        </Link>
        <Link href="/users" className={`${styles.headerLink}`}>
          Users
        </Link>
      </nav>
    </header>
  );
};

export default Header;
