import FinalistClub from "../../KataFinal/FinalistClub/FinalistClub";
import FinalistKata from "../../KataFinal/FinalistKata/FinalistKata";
import styles from "./teamcard.module.css";

export default function TeamCard({ katas }) {
  return (
    <div className={styles.finalistCard}>
      <div>
        <FinalistKata katas={katas}></FinalistKata>
      </div>
      <div>
        <FinalistClub></FinalistClub>
      </div>
    </div>
  );
}
