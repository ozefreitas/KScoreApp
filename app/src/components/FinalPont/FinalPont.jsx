import styles from "./finalpont.module.css";
import { useCallback, useEffect } from "react";

export default function FinalPont({ sumScore, setSumScore }) {
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
    }
    finalScore = finalScore - minvalue - maxvalue;
  };
  if (Object.keys(sumScore).length === 5) {
    changeFinalScore();
  }

  // handle what happens on key press
  const handleKeyPress = useCallback(
    (event) => {
      if (event.ctrlKey === true && event.key === "Backspace") {
        setSumScore({})
        document.getElementById("pont_form").reset();
      }
    },
    [setSumScore]
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
