import styles from "./header.module.css";
import React from "react";

export default function Header({ match }) {
  let matchType;
  const renderMatchType = () => {
    if (match === "team kata") {
      matchType = "Kata Equipa ";
    } else if (match === "kumite") {
      matchType = "Kumite ";
    } else if (match === "teamkumite") {
      matchType = "Kumite Equipa ";
    } else {
      matchType = "Kata ";
    }
    return matchType;
  };
  renderMatchType();
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
      <span className={`${styles.kataText} ${styles[match]}`}>
        {matchType}
        <input
          type="text"
          className={styles.kataInput}
          placeholder="Category"
        ></input>
      </span>
    </div>
  );
}
