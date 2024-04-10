import styles from "./finalistclub.module.css";

export default function FinalistClub({ match, state }) {
  return (
    <form id="club_form" className={styles[match]}>
      <div className={`${styles.clubContainer} ${styles[match]}`}>
        {match === "teamkata" ? (
          <input
            className={`${styles.clubName} ${styles[match]}`}
            type="text"
            placeholder="TEAM"
          ></input>
        ) : (
          <input
            className={`${styles.clubName} ${styles[match]}`}
            type="text"
            placeholder="TEAM"
            value={state.competitorTeam}
            readOnly
          ></input>
        )}
      </div>
    </form>
  );
}
