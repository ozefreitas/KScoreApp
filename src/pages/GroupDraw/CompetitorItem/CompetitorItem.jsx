import styles from "./competitoritem.module.css";

export default function CompetitorItem({
  competitor,
  compToChange,
  setCompToChange,
}) {
  const handleChange = (event) => {
    const compChange = { ...compToChange };
    const { name, value, checked } = event.target;
    compChange[`${name}|${value}`] = checked;
    setCompToChange(compChange);
  };

  return (
    <div className={styles.boxContainer}>
      <label htmlFor={competitor.number} className={styles.compLabels}>
        {competitor.number} {competitor.name}
      </label>
      <input
        type="checkbox"
        id={competitor.number}
        name={competitor.name}
        value={competitor.number}
        className={styles.checkBoxPosition}
        onChange={handleChange}
        defaultChecked
      ></input>
    </div>
  );
}
