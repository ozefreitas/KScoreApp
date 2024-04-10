import CompInfo from "../../../components/CompInfo/CompInfo";
import CompName from "../../../components/CompName/CompName";
import styles from "./kumitecompcard.module.css";
import { useState, useEffect } from "react";

export default function KumiteCompCard({ match, competitors }) {
  const [state, setState] = useState({
    competitorNameShiro: "",
    competitorTeamShiro: "",
    competitorNumberShiro: 0,
    competitorNameAka: "",
    competitorTeamAka: "",
    competitorNumberAka: 0,
  });

  const handleKeyPress = (event) => {
    if (event.code === "Backspace" && event.ctrlKey) {
      document.getElementById("number_form_aka").reset();
      document.getElementById("number_form_shiro").reset();
      setState((prevState) => ({
        ...prevState,
        competitorNameShiro: "",
        competitorTeamShiro: "",
        competitorNumberShiro: 0,
        competitorNameAka: "",
        competitorTeamAka: "",
        competitorNumberAka: 0
      }));
    }
  };
  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div>
      <div className={styles.colorName}>
        <span className={styles.akaName}>
          <i>AKA</i>
        </span>
        <span className={styles.shiroName}>
          <i>SHIRO</i>
        </span>
      </div>
      <div className={styles.cardsContainer}>
        <div className={`${styles.outerCard} ${styles.akaCard}`}>
          {match === "teamkumite" ? (
            ""
          ) : (
            <CompName match="kumite" id="aka" state={state}></CompName>
          )}
          <form id="number_form_aka" className={`${styles.numberForm} ${styles[match]}`}>
            <CompInfo
              match={match}
              id="aka"
              state={state}
              setState={setState}
              competitors={competitors}
            ></CompInfo>
          </form>
        </div>
        <div className={`${styles.outerCard} ${styles.shiroCard}`}>
          {match === "teamkumite" ? (
            ""
          ) : (
            <CompName match="kumite" id="shiro" state={state}></CompName>
          )}
          <form id="number_form_shiro" className={`${styles.numberForm} ${styles[match]}`}>
            <CompInfo
              match={match}
              id="shiro"
              state={state}
              setState={setState}
              competitors={competitors}
            ></CompInfo>
          </form>
        </div>
      </div>
    </div>
  );
}
