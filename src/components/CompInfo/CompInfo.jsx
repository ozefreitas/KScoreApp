import CompNumber from "../CompNumber/CompNumber";
import CompClub from "../CompClub/CompClub";
import styles from "./compinfo.module.css";

export default function CompInfo({
  id,
  match,
  state,
  setState,
  competitors,
  winner,
}) {
  return (
    <div className={`${styles.compInfoContainer} ${styles[match]} ${winner ? styles.blinking : ""}`}>
      {match === "kumite" || match === "kata" ? (
        <CompNumber
          id={id}
          state={state}
          setState={setState}
          competitors={competitors}
        ></CompNumber>
      ) : (
        ""
      )}
      <CompClub match={match} id={id} state={state}></CompClub>
    </div>
  );
}
