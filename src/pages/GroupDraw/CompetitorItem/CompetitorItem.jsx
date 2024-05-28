import styles from "./competitoritem.module.css";

export default function CompetitorItem({
  competitor,
  team,
  modality,
  compToChange,
  setCompToChange,
  teamToChange,
  setTeamToChange,
}) {
  const handleCompChange = (event) => {
    const compChange = { ...compToChange };
    const { name, value, checked } = event.target;
    compChange[`${name}|${value}`] = checked;
    setCompToChange(compChange);
  };

  const handleTeamChange = (event) => {
    const teamChange = { ...teamToChange };
    const { name, value, checked } = event.target;
    teamChange[`${name}|${value}`] = checked;
    setTeamToChange(teamChange);
  };

  return (
    <div className={styles.boxContainer}>
      {modality === "Individual"
        ? competitor && (
            <>
              <label htmlFor={competitor.number} className={styles.compLabels}>
                {competitor.number} {competitor.name}
              </label>
              <input
                type="checkbox"
                id={competitor.number}
                name={competitor.name}
                value={competitor.number}
                className={styles.checkBoxPosition}
                onChange={handleCompChange}
                defaultChecked
              ></input>
            </>
          )
        : team && (
            <>
              <label htmlFor={team.number} className={styles.compLabels}>
                {team.name}
              </label>
              <input
                type="checkbox"
                id={team.number}
                name={team.name}
                value={team.number}
                className={styles.checkBoxPosition}
                onChange={handleTeamChange}
                defaultChecked
              ></input>
            </>
          )}
    </div>
  );
}
