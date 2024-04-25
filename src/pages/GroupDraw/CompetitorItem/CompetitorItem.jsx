import styles from "./competitoritem.module.css";

export default function CompetitorItem({ competitor, compList, setCompList }) {
  const handleChange = (event) => {
    const compChange = {...compList}
    const { name, checked } = event.target;
    compChange[name] = checked
    setCompList(compChange)
  }
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
