import FinalistClub from "../FinalistClub/FinalistClub";
import FinalistKata from "../FinalistKata/FinalistKata";
import FinalistName from "../FinalistName/FinalistName";
import FinalistNumber from "../FinalistNumber/FinalistNumber";
import styles from "./finalistcard.module.css";

export default function FinalistCard({ competitors, katas }) {
  return (
    <div className={styles.finalistCard}>
      <div>
        <FinalistName></FinalistName>
        <FinalistKata katas={katas}></FinalistKata>
      </div>
      <div>
        <FinalistClub></FinalistClub>
        <FinalistNumber></FinalistNumber>
      </div>
    </div>
  );
}
