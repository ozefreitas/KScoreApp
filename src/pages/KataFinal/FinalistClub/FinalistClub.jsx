import styles from "./finalistclub.module.css";

export default function FinalistClub({ match, state }) {
  return (
    <form id="club_form" className={styles[match]}>
      <div className={`${styles.clubContainer} ${styles[match]}`}>
        {match === "teamkata" ? (
          <input
            className={`${styles.clubName} ${styles[match]}`}
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
