import styles from "./finalpont.module.css";

export default function FinalPont({ sumScore }) {
  let finalScore = 0;
  const changeFinalScore = () => {
    let minvalue = Infinity;
    let maxvalue = -Infinity;
    for (const property in sumScore) {
      if (sumScore[property] < minvalue) {
        minvalue = sumScore[property];
      }
      if (sumScore[property] > maxvalue) {
        maxvalue = sumScore[property];
      }
      finalScore = finalScore + sumScore[property];
    };
    finalScore = finalScore - minvalue - maxvalue;
  };
  if (Object.keys(sumScore).length === 5) {
    changeFinalScore();
  } else {
    
  }

  return (
    <div className={styles.finalPontCard}>
      <input
        placeholder="0.0"
        readOnly
        className={styles.finalscore}
        value={finalScore.toFixed(1)}
      ></input>
    </div>
  );
}
