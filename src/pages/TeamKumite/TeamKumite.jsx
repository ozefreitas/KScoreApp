import Kumite from "../Kumite/Kumite";
import styles from "./teamkumite.module.css"

export default function TeamKumite({ competitors, match }) {
  return (
    <div>
      <Kumite match={match} competitors={competitors}></Kumite>
      <div className={styles.wonMatches}>

      </div>
    </div>
  );
}
