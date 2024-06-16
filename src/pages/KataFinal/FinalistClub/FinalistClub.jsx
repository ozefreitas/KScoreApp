import styles from "./finalistclub.module.css";

export default function FinalistClub({
  match,
  state,
  id,
  winner,
  kataOrKihon,
}) {
  return (
    <form
      id={`club_form${match === "kihon" ? id : ""}`}
      className={styles[match]}
    >
      <div
        className={`${styles.clubContainer} ${styles[match]} ${
          match === "kihon" ? (winner ? styles.blinking : "") : ""
        }`}
      >
        {match === "teamkata" || match === "kihon" ? (
          <input
            className={`${styles.clubName} ${
              kataOrKihon === "Kihon Finais " ? styles.kihon : ""
            } ${styles[match]} ${
              match === "kihon"
                ? id === "shiro"
                  ? styles.black
                  : styles.white
                : ""
            }`}
            type="text"
            placeholder="clube"
          ></input>
        ) : (
          <input
            className={`${styles.clubName} ${styles[match]}`}
            type="text"
            placeholder="clube"
            value={state.competitorTeam}
            readOnly
          ></input>
        )}
      </div>
    </form>
  );
}
