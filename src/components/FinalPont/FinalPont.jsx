import styles from "./finalpont.module.css";
import { useCallback, useEffect } from "react";

export default function FinalPont({
  sumScore,
  setOverline,
  setSumScore,
  setMinIndex,
  setMaxIndex,
  finalScore,
  setFinalScore,
  setShowNotification,
  setNotificationTitle,
  setNotificationBody,
}) {
  const scoresIndex = Object.values(sumScore);

  const changeFinalInfo = useCallback(() => {
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
    if (scoresIndex.every((val, i, arr) => val === arr[0])) {
      setMinIndex(1);
      setMaxIndex(5);
    }
  }, [scoresIndex, setFinalScore, setMaxIndex, setMinIndex, sumScore]);

  const handleKeyPress = useCallback(
    (event) => {
      const activeElement = document.activeElement;
      if (event.key === "Enter" && Object.keys(sumScore).length === 5) {
        changeFinalInfo();
        if (activeElement.type === "number") {
          activeElement.blur();
        }
      } else if (
        event.key === "Enter" &&
        activeElement.type === "number" &&
        Object.keys(sumScore).length !== 5
      ) {
        setShowNotification(true);
        setNotificationTitle("Erro de Input");
        setNotificationBody("Insira pontuação/Pontuação errada");
      } else if (Object.keys(sumScore).length !== 5) {
        setOverline({
          overline1: undefined,
          overline2: undefined,
          overline3: undefined,
          overline4: undefined,
          overline5: undefined,
        });
      }
    },
    [
      setOverline,
      sumScore,
      changeFinalInfo,
      setShowNotification,
      setNotificationTitle,
      setNotificationBody,
    ]
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
        readOnly
        className={styles.finalscore}
        value={finalScore.toFixed(1)}
      ></input>
    </div>
  );
}
