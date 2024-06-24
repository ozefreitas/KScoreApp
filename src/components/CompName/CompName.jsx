import styles from "./compname.module.css";
import "../../variables.css"

export default function CompName({ match, id, state, winner }) {
  return (
    <div
      className={`${styles.nameContainer} ${styles[match]} ${
        winner ? "blinking" : ""
      }`}
    >
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
