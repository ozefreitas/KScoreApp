import { useEffect } from "react";
import styles from "./compnumber.module.css";

export default function CompNumber({ id, state, setState, competitors }) {
  console.log(state)
  const invertOrder = id !== "aka";
  const handleChange = (e) => {
    if (id === "aka") {
      setState((prevState) => ({
        ...prevState,
        competitorNumberAka: e.target.value,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        competitorNumberShiro: e.target.value,
      }));
    }
  };

  useEffect(() => {
    const changeCompInfo = () => {
      competitors.map((competitor) => {
        if (competitor.number === state.competitorNumberShiro) {
          setState((prevState) => ({
            ...prevState,
            competitorNameShiro: competitor.name,
            competitorTeamShiro: competitor.team,
          }));
        } else if (competitor.number === state.competitorNumberAka) {
          setState((prevState) => ({
            ...prevState,
            competitorNameAka: competitor.name,
            competitorTeamAka: competitor.team,
          }));
        }
      });
      if (state.competitorNumberAka.length === 0) {
        setState((prevState) => ({
          ...prevState,
          competitorNameAka: "",
          competitorTeamAka: "",
        }));
      }
      if (state.competitorNumberShiro.length === 0) {
        setState((prevState) => ({
          ...prevState,
          competitorNameShiro: "",
          competitorTeamShiro: "",
        }));
      }
    };
    changeCompInfo();
  }, [state.competitorNumberAka, state.competitorNumberShiro]);

  return (
    <div
      className={`${styles.numberContainer} ${
        invertOrder ? styles.invert : ""
      }`}
    >
      <input
        type="number"
        placeholder="000"
        className={`${styles.compNumber} ${
          id === "aka" ? styles.white : styles.black
        }`}
        onChange={handleChange}
      ></input>
    </div>
  );
}
