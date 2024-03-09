import styles from "./compname.module.css";

export default function CompName({ id }) {
  return (
    <div className={styles.nameContainer}>
      <input
        type="text"
        placeholder="Competitor Name"
        className={`${styles.compName} ${
          id === "aka" ? styles.white : styles.black
        }`}
      ></input>
    </div>
  );
}
