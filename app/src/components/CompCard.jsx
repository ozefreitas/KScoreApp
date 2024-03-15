import CompInfo from "./CompInfo";
import CompName from "./CompName";
import KataName from "./KataName";
import AkaScore from "./AkaScore";
import ShiroScore from "./ShiroScore";
import styles from "./compcard.module.css";
import { useState } from "react";

export default function CompCard({ competitors, katas }) {
  const [state, setState] = useState({
    competitorNameShiro: "",
    competitorTeamShiro: "",
    competitorNumberShiro: 0,
    competitorNameAka: "",
    competitorTeamAka: "",
    competitorNumberAka: 0,
  });
  const [akaScore, setAkaScore] = useState("");

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
          <CompInfo
            id="aka"
            state={state}
            setState={setState}
            competitors={competitors}
          ></CompInfo>
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
          <CompInfo
            id="shiro"
            state={state}
            setState={setState}
            competitors={competitors}
          ></CompInfo>
          <KataName id="shiro" katas={katas}></KataName>
          <ShiroScore id="shiro" akaScore={akaScore}></ShiroScore>
        </div>
      </div>
    </div>
  );
}
