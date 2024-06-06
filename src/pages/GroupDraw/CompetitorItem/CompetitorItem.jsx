import styles from "./competitoritem.module.css";

export default function CompetitorItem({
  competitor,
  team,
  modality,
  compToChange,
  setCompToChange,
  teamToChange,
  setTeamToChange,
  setCurrentNumber,
}) {
  const handleCompChange = (event) => {
    const compChange = { ...compToChange };
    const { name, value, checked } = event.target;
    compChange[`${name}|${value.split(" ")[0]}|${value.split(" ")[1]}`] =
      checked;
    setCompToChange(compChange);
    let keys = Object.keys(compChange);
    let filtered = keys.filter((key) => {
      return compChange[key];
    });
    setCurrentNumber(filtered.length);
  };

  const handleTeamChange = (event) => {
    const teamChange = { ...teamToChange };
    const { name, checked } = event.target;
    teamChange[`${name}`] = checked;
    setTeamToChange(teamChange);
    let keys = Object.keys(teamChange);
    let filtered = keys.filter((key) => {
      return teamChange[key];
    });
    setCurrentNumber(filtered.length);
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
                value={`${competitor.number} ${competitor.team}`}
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
