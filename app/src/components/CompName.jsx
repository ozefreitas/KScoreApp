import styles from "./compname.module.css";

export default function CompName({ id }) {
  return (
    <div>
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
