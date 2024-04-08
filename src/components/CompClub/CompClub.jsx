import styles from "./compclub.module.css";

export default function CompClub({ id, match, state }) {
  return (
    <div className={`${styles.clubContainer} ${styles[match]}`}>
      {match === "kumite" || match === "kata" ? (
        <input
          type="text"
          placeholder="TEAM"
          className={`${styles.compClub} ${
            id === "aka" ? styles.white : styles.black
          }`}
          value={
            id === "aka" ? state.competitorTeamAka : state.competitorTeamShiro
          }
          readOnly
        ></input>
      ) : (
        <input
          type="text"
          placeholder="TEAM"
          className={`${styles.compClub} ${
            id === "aka" ? styles.white : styles.black
          }`}
        ></input>
      )}
    </div>
  );
}
