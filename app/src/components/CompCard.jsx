import CompInfo from "./CompInfo";
import CompName from "./CompName";
import KataName from "./KataName";
import Score from "./Score";
import styles from "./compcard.module.css";

export default function CompCard() {
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
          <Score id="aka"></Score>
        </div>
        <div className={`${styles.outerCard} ${styles.shiroCard}`}>
          <CompName id="shiro"></CompName>
          <CompInfo id="shiro"></CompInfo>
          <KataName id="shiro"></KataName>
          <Score id="shiro"></Score>
        </div>
      </div>
    </div>
  );
}
