import styles from "./compclub.module.css";

export default function CompClub({ id, state }) {
  return (
    <div className={styles.clubContainer}>
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
    </div>
  );
}
