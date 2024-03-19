import CompNumber from "./CompNumber";
import CompClub from "./CompClub";
import styles from "./compinfo.module.css";

export default function CompInfo({ id, state, setState, competitors }) {
  return (
    <div className={styles.compInfoContainer}>
      <CompNumber
        id={id}
        state={state}
        setState={setState}
        competitors={competitors}
      ></CompNumber>
      <CompClub id={id} state={state}></CompClub>
    </div>
  );
}
