import CompInfo from "../../../components/CompInfo/CompInfo";
import CompName from "../../../components/CompName/CompName";
import KataName from "../../../components/KataName/KataName";
import AkaScore from "../../KataElim/AkaScore/AkaScore";
import ShiroScore from "../../KataElim/ShiroScore/ShiroScore";
import styles from "./compcard.module.css";
import { useState, useEffect, useCallback } from "react";

export default function CompCard({ match, competitors, katas }) {
  const [state, setState] = useState({
    competitorNameShiro: "",
    competitorTeamShiro: "",
    competitorNumberShiro: 0,
    competitorNameAka: "",
    competitorTeamAka: "",
    competitorNumberAka: 0,
  });
  const [akaScore, setAkaScore] = useState("");

  const handleKeyPress = useCallback(
    (event) => {
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
          competitorNumberAka: 0,
        }));
      }
    },
    [setState]
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
          <CompName id="aka" state={state}></CompName>
          <form id="number_form_aka">
            <CompInfo
              id="aka"
              match={match}
              state={state}
              setState={setState}
              competitors={competitors}
            ></CompInfo>
          </form>
          <KataName id="aka" katas={katas}></KataName>
          <AkaScore
            id="aka"
            akaScore={akaScore}
            setAkaScore={setAkaScore}
            setState={setState}
          ></AkaScore>
        </div>
        <div className={`${styles.outerCard} ${styles.shiroCard}`}>
          <CompName id="shiro" state={state}></CompName>
          <form id="number_form_shiro">
            <CompInfo
              id="shiro"
              match={match}
              state={state}
              setState={setState}
              competitors={competitors}
            ></CompInfo>
          </form>
          <KataName id="shiro" katas={katas}></KataName>
          <ShiroScore id="shiro" akaScore={akaScore}></ShiroScore>
        </div>
      </div>
    </div>
  );
}
