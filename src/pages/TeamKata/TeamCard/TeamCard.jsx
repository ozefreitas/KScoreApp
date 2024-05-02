import FinalistClub from "../../KataFinal/FinalistClub/FinalistClub";
import FinalistKata from "../../KataFinal/FinalistKata/FinalistKata";
import styles from "./teamcard.module.css";

export default function TeamCard({
  match,
  katas,
  setShowNotification,
  setNotificationTitle,
  setNotificationBody,
}) {
  return (
    <div className={styles.finalistCard}>
      <div>
        <FinalistKata
          katas={katas}
          match={match}
          setShowNotification={setShowNotification}
          setNotificationTitle={setNotificationTitle}
          setNotificationBody={setNotificationBody}
        ></FinalistKata>
      </div>
      <div>
        <FinalistClub match={match}></FinalistClub>
      </div>
    </div>
  );
}
