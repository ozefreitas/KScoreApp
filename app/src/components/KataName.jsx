import styles from "./kataname.module.css";

export default function KataName({ id }) {
  return (
    <div className={styles.upperLayer}>
      <input
        placeholder="Kata Name"
        className={`${styles.kataName} ${
          id === "aka" ? styles.white : styles.black
        }`}
        type="text"
      />
    </div>
  );
}
