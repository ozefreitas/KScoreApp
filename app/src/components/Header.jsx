import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.headerSpacing}>
      <span>
        Tatami{" "}
        <input
          className={styles.tatamiInput}
          type="number"
          placeholder="0"
        ></input>
      </span>
      <span>
        Kata <input className={styles.kataInput} placeholder="Escalão"></input>
      </span>
    </div>
  );
}
