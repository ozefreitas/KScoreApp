import styles from "./finalistname.module.css";

export default function FinalistName() {
  return (
    <div className={styles.nameContainer}>
      <input
        className={styles.compName}
        type="text"
        placeholder="Competitor Name"
        // className={}
        // value={}
        // readOnly
      ></input>
    </div>
  );
}