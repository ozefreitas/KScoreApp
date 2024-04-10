import styles from "./finalpont.module.css";
import { useCallback, useEffect, useState } from "react";

export default function FinalPont({
  sumScore,
  setSumScore,
  setMinIndex,
  setMaxIndex,
}) {
  const [finalScore, setFinalScore] = useState(0);
  const scoresIndex = Object.values(sumScore);

  const changeFinalInfo = () => {
    let final = 0;
    let minvalue = Infinity;
    let maxvalue = -Infinity;
    for (const property in sumScore) {
      if (sumScore[property] < minvalue) {
        minvalue = sumScore[property];
      }
      if (sumScore[property] > maxvalue) {
        maxvalue = sumScore[property];
      }
      final = final + sumScore[property];
    }
    final = final - minvalue - maxvalue;
    setFinalScore(final);
    setMinIndex(scoresIndex.findIndex((score) => score === minvalue) + 1);
    setMaxIndex(scoresIndex.findIndex((score) => score === maxvalue) + 1);
  };

  // handle what happens on key press
  const handleKeyPress = useCallback(
    (event) => {
      if (event.ctrlKey === true && event.key === "Backspace") {
        setSumScore({});
        setMaxIndex("");
        setMinIndex("");
        document.getElementById("pont_form").reset();
      } else if (event.key === "Enter" && Object.keys(sumScore).length === 5) {
        changeFinalInfo();
      }
    },
    [setSumScore, sumScore, changeFinalInfo, setMaxIndex, setMinIndex]
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
