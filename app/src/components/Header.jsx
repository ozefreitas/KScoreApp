import styles from "./header.module.css";
import React from "react";
import { IconButton } from "rsuite";
import { Menu } from "@rsuite/icons";

export default function Header({ isMenuOpen, setIsMenuOpen }) {
  function handleOnClick() {
    !isMenuOpen ? setIsMenuOpen(true) : setIsMenuOpen(false);
    console.log(isMenuOpen);
  }
  return (
    <div className={styles.headerSpacing}>
      <IconButton
        onClick={handleOnClick}
        icon={<Menu />}
        className={styles.navButton}
      ></IconButton>
      <span className={styles.tatamiText}>
        Tatami{" "}
        <input
          className={styles.tatamiInput}
          type="number"
          placeholder="0"
        ></input>
      </span>
      <span>
        Kata{" "}
        <input
          type="text"
          className={styles.kataInput}
          placeholder="Category"
        ></input>
      </span>
    </div>
  );
}
