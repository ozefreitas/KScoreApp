import styles from "./kataname.module.css";
import { useState } from "react";

export default function KataName({ id, katas }) {
  const [kataNumber, setKataNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    katas.map((kata) => {
      if (id === "aka") {
        if (kata.kata_number === kataNumber) {
          setKataNumber(kata.kata_name);
        }
      } else {
        if (kata.kata_number === kataNumber) {
          setKataNumber(kata.kata_name);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.upperLayer}>
        <input
          placeholder="Kata Name"
          className={`${styles.kataName} ${
            id === "aka" ? styles.white : styles.black
          }`}
          type="text"
          onChange={(e) => setKataNumber(e.target.value)}
          value={kataNumber}
        />
        <button className={styles.kataButton} type="submit">
          Zerar Kata Name
        </button>
      </div>
    </form>
  );
}
