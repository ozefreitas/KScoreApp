import styles from "./score.module.css";

export default function Score({ id }) {
  return (
    <div className={styles.bigNumberContainer}>
      <input
        min="0"
        max="5"
        placeholder="0"
        className={`${styles.bigNumber} ${
          id === "aka" ? styles.white : styles.black
        }`}
        type="number"
      />
    </div>
  );
}
