import styles from "./finalistclub.module.css";

export default function FinalistClub() {
  return (
    <div className={styles.clubContainer}>
      <input className={styles.clubName}
        type="text"
        placeholder="TEAM"
        // className={}
        // value={}
        // readOnly
      ></input>
    </div>
  );
}
