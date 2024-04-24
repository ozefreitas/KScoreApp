import styles from "./compname.module.css";

export default function CompName({ match, id, state }) {
  return (
    <div className={`${styles.nameContainer} ${styles[match]}`}>
      <input
        type="text"
        placeholder="Nome Competidor"
        className={`${styles.compName} ${styles[match]} ${
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
