import styles from "./kataname.module.css";
import { useState, useEffect, useCallback } from "react";

export default function KataName({ id, katas }) {
  const [kataNumber, setKataNumber] = useState("");
  const handleKeyPress = useCallback(
    (event) => {
      if (event.code === "Backspace" && event.ctrlKey) {
        setKataNumber("");
      }
    },
    [setKataNumber]
  );
  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
          placeholder="Nome Kata"
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
