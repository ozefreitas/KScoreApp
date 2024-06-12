import styles from "./finalpont.module.css";
import { useCallback, useEffect, useState } from "react";

export default function FinalPont({
  sumScore,
  setState,
  setSumScore,
  setMinIndex,
  setMaxIndex,
  setShowNotification,
  setNotificationTitle,
  setNotificationBody,
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
    if (scoresIndex.every((val, i, arr) => val === arr[0])) {
      setMinIndex(1);
      setMaxIndex(5);
    }
  };

  const handleKeyPress = useCallback(
    (event) => {
      const activeElement = document.activeElement;
      if (event.ctrlKey === true && event.key === "Backspace") {
        setSumScore({});
        setMaxIndex("");
        setMinIndex("");
        setFinalScore(0);
        setState({
          overline1: undefined,
          overline2: undefined,
          overline3: undefined,
          overline4: undefined,
          overline5: undefined,
        });
        document.getElementById("pont_form").reset();
      } else if (event.key === "Enter" && Object.keys(sumScore).length === 5) {
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
        setState({
          overline1: undefined,
          overline2: undefined,
          overline3: undefined,
          overline4: undefined,
          overline5: undefined,
        });
      }
    },
    [
      setSumScore,
      setState,
      sumScore,
      changeFinalInfo,
      setMaxIndex,
      setMinIndex,
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
        placeholder="0.0"
        readOnly
        className={styles.finalscore}
        value={finalScore.toFixed(1)}
      ></input>
    </div>
  );
}
