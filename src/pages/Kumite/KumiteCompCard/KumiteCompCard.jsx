import CompInfo from "../../../components/CompInfo/CompInfo";
import CompName from "../../../components/CompName/CompName";
import styles from "./kumitecompcard.module.css";
import { useState } from "react";

export default function KumiteCompCard({ match, competitors }) {
  const [state, setState] = useState({
    competitorNameShiro: "",
    competitorTeamShiro: "",
    competitorNumberShiro: 0,
    competitorNameAka: "",
    competitorTeamAka: "",
    competitorNumberAka: 0,
  });

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
        {match === "teamkumite" ? "" : <CompName match="kumite" id="aka" state={state}></CompName>}
          <CompInfo
            match={match}
            id="aka"
            state={state}
            setState={setState}
            competitors={competitors}
          ></CompInfo>
        </div>
        <div className={`${styles.outerCard} ${styles.shiroCard}`}>
          {match === "teamkumite" ? "" : <CompName match="kumite" id="shiro" state={state}></CompName>}
          <CompInfo
            match={match}
            id="shiro"
            state={state}
            setState={setState}
            competitors={competitors}
          ></CompInfo>
        </div>
      </div>
    </div>
  );
}
