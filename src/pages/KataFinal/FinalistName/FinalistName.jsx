import styles from "./finalistname.module.css";

export default function FinalistName({state}) {
  return (
    <div className={styles.nameContainer}>
      <input
        className={styles.compName}
        type="text"
        placeholder="Nome Competidor"
        // className={}
        value={state.competitorName}
        readOnly
      ></input>
    </div>
  );
}