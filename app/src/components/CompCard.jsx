import CompInfo from "./CompInfo";
import CompName from "./CompName";
import KataName from "./KataName";
import AkaScore from "./AkaScore";
import ShiroScore from "./ShiroScore";
import styles from "./compcard.module.css";
import { useState } from "react";

export default function CompCard() {
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
          <CompName id="aka"></CompName>
          <CompInfo id="aka"></CompInfo>
          <KataName id="aka"></KataName>
          <AkaScore
            id="aka"
            akaScore={akaScore}
            setAkaScore={setAkaScore}
          ></AkaScore>
        </div>
        <div className={`${styles.outerCard} ${styles.shiroCard}`}>
          <CompName id="shiro"></CompName>
          <CompInfo id="shiro"></CompInfo>
          <KataName id="shiro"></KataName>
          <ShiroScore id="shiro" akaScore={akaScore}></ShiroScore>
        </div>
      </div>
    </div>
  );
}
