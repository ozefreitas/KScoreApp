import styles from "./compclub.module.css";

export default function CompClub({ id }) {
  return (
    <span>
      <input
        type="text"
        placeholder="Club"
        className={`${styles.compClub} ${
          id === "aka" ? styles.white : styles.black
        }`}
      ></input>
    </span>
  );
}
