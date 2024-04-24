import styles from "./competitoritem.module.css";

export default function CompetitorItem({ competitor }) {
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
        defaultChecked
      ></input>
    </div>
  );
}
