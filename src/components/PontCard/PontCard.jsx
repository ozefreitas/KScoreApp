import styles from "./pontcard.module.css";
import { useState  } from "react";

export default function PontCard({
  judge,
  setSumScore,
  overline
}) {

  const handleChange = (e) => {
    const score = parseFloat(e.target.value);
    if (e.target.value.trim() !== "") {
      setSumScore((prevSumScore) => {
        const key = judge;
        return { ...prevSumScore, [key]: score };
      });
    }
    if (isNaN(score)) {
      setSumScore((prevSumScore) => {
        const key = judge;
        return { ...prevSumScore, [key]: "" };
      });
    }
  };

  return (
    <div className={styles.square}>
      <input
        type="number"
        className={`${styles.scores} ${overline ? styles.overline : ""}`}
        placeholder="0.0"
        onChange={handleChange}
      ></input>
    </div>
  );
}
