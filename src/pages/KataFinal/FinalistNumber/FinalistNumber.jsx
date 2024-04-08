import styles from "./finalistnumber.module.css";
import { useEffect } from "react";

export default function FinalistNumber({state, setState, competitors}) {
  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      competitorNumber: e.target.value,
    }));
  };

  useEffect(() => {
    const changeCompInfo = () => {
      competitors.map((competitor) => {
        if (competitor.number === state.competitorNumber) {
          setState((prevState) => ({
            ...prevState,
            competitorName: competitor.name,
            competitorTeam: competitor.team,
          }));
        }
      });
      if (state.competitorNumber.length === 0) {
        setState((prevState) => ({
          ...prevState,
          competitorName: "",
          competitorTeam: "",
        }));
      }
    };
    changeCompInfo();
  }, [state.competitorNumber]);

  return (
    <div className={styles.numberContainer}>
      <input
        type="number"
        placeholder="000"
        className={styles.compNumber}
        onChange={handleChange}
      ></input>
    </div>
  );
}
