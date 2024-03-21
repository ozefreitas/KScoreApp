import styles from "./finalistnumber.module.css";

export default function FinalistNumber() {
  return (
    <div className={styles.numberContainer}>
      <input
        type="number"
        placeholder="000"
        className={styles.compNumber}
        // onChange={handleChange}
      ></input>
      {/* {console.log(state)} */}
    </div>
  );
}
