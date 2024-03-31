import styles from "./finalistclub.module.css";

export default function FinalistClub({styling}) {
  return (
    <div className={`${styles.clubContainer} ${styles[styling]}`}>
      <input className={`${styles.clubName} ${styles[styling]}`}
        type="text"
        placeholder="TEAM"
        // value={}
        // readOnly
      ></input>
    </div>
  );
}
