import styles from "./finalistclub.module.css";

export default function FinalistClub({ match, state, styling }) {
  return (
    <div className={`${styles.clubContainer} ${styles[styling]}`}>
      {match === "teamkata" ? (
        <input
          className={`${styles.clubName} ${styles[styling]}`}
          type="text"
          placeholder="TEAM"
        ></input>
      ) : (
        <input
          className={`${styles.clubName} ${styles[styling]}`}
          type="text"
          placeholder="TEAM"
          value={state.competitorTeam}
          readOnly
        ></input>
      )}
    </div>
  );
}
