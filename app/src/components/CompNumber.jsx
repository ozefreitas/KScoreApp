import styles from "./compnumber.module.css";

export default function CompNumber({ id }) {
  const invertOrder = id === "aka" ? false : true;
  return (
    <span
      className={`${styles.numberContainer} ${
        invertOrder ? styles.invert : ""
      }`}
    >
      <input
        type="number"
        placeholder="000"
        className={`${styles.compNumber} ${
          id === "aka" ? styles.white : styles.black
        }`}
      ></input>
    </span>
  );
}
