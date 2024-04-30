import { IconButton } from "rsuite";
import { Menu } from "@rsuite/icons";
import { useEffect, useCallback } from "react";
import styles from "./navButton.module.css";

export default function NavButton({ isMenuOpen, setIsMenuOpen, setBlinking }) {
  function handleOnClick() {
    !isMenuOpen ? setIsMenuOpen(true) : setIsMenuOpen(false);
    setBlinking(false)
  }

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
        setBlinking(false)
      }
    },
    [setIsMenuOpen, setBlinking]
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
