import { IconButton } from "rsuite";
import { Menu } from "@rsuite/icons";
import styles from "./navButton.module.css"

export default function NavButton({ isMenuOpen, setIsMenuOpen }) {
  function handleOnClick() {
    !isMenuOpen ? setIsMenuOpen(true) : setIsMenuOpen(false);
    
  }

  return (
    <div className={styles.relativePos}>
      <IconButton
        onClick={handleOnClick}
        icon={<Menu />}
        className={styles.navButton}
      ></IconButton>
    </div>
  );
}
