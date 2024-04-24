import CompetitorItem from "../CompetitorItem/CompetitorItem";
import styles from "./competitorlist.module.css";

export default function CompetitorList({ competitors, category }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target[0].checked);
  };
  console.log(category);
  return (
    <div className={styles.centerForm}>
      <form onSubmit={handleSubmit} className={styles.notHidden}>
        {category !== null
          ? competitors
              .filter((competitor) => competitor.category === category)
              .map((competitor, index) => (
                <CompetitorItem
                  key={index}
                  competitor={competitor}
                ></CompetitorItem>
              ))
          : competitors.map((competitor, index) => (
              <CompetitorItem
                key={index}
                competitor={competitor}
              ></CompetitorItem>
            ))}
      </form>
      <button type="submit" className={styles.drawButton}>
        Iniciar Sorteio
      </button>
    </div>
  );
}
