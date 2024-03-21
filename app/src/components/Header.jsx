import styles from "./header.module.css";
import React from "react";

export default function Header() {

  return (
    <div className={styles.headerSpacing}>
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
