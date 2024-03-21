import styles from "./compname.module.css";

export default function CompName({ id, state }) {
  return (
    <div className={styles.nameContainer}>
      <input
        type="text"
        placeholder="Competitor Name"
        className={`${styles.compName} ${
          id === "aka" ? styles.white : styles.black
        }`}
        value={
          id === "aka" ? state.competitorNameAka : state.competitorNameShiro
        }
        readOnly
      ></input>
    </div>
  );
}
