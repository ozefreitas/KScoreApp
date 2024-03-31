import styles from "./finalistkata.module.css";
import { useState } from "react";

export default function FinalistKata({ katas, styling }) {
  const [kataNumber, setKataNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    katas.map((kata) => {
      if (kata.kata_number === kataNumber) {
        setKataNumber(kata.kata_name);
      }
    });
  };

  return (
    <div className={`${styles.kataContainer} ${styles[styling]}`}>
      <form onSubmit={handleSubmit} className={styles[styling]}>
        <div className={styles[styling]}>
          <input
            placeholder="Kata Name"
            className={`${styles.kataName} ${styles[styling]}`}
            type="text"
            onChange={(e) => setKataNumber(e.target.value)}
            value={kataNumber}
          />
          <button className={styles.kataButton} type="submit">
            Zerar Kata Name
          </button>
        </div>
      </form>
    </div>
  );
}
