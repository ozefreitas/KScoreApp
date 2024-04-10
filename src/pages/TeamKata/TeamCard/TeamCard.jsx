import FinalistClub from "../../KataFinal/FinalistClub/FinalistClub";
import FinalistKata from "../../KataFinal/FinalistKata/FinalistKata";
import styles from "./teamcard.module.css";

export default function TeamCard({ match, katas }) {
  
  return (
    <div className={styles.finalistCard}>
      <div>
        <FinalistKata katas={katas} match={match} ></FinalistKata>
      </div>
      <div>
        <FinalistClub match={match} ></FinalistClub>
      </div>
    </div>
  );
}
