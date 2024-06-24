import FinalistClub from "../../KataFinal/FinalistClub/FinalistClub";
import FinalistKata from "../../KataFinal/FinalistKata/FinalistKata";
import styles from "./teamcard.module.css";
import { useEffect } from "react";

export default function TeamCard({
  match,
  katas,
  setClubName,
  setShowNotification,
  setNotificationTitle,
  setNotificationBody,
  kataOrKihon,
}) {
  const handleKeyPress = (event) => {
    if (event.ctrlKey && event.key === "Backspace") {
      document.getElementById("club_form").reset();
    }
  };

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className={styles.finalistCard}>
      {kataOrKihon === "Kata Equipa " ? (
        <div>
          <FinalistKata
            katas={katas}
            match={match}
            setShowNotification={setShowNotification}
            setNotificationTitle={setNotificationTitle}
            setNotificationBody={setNotificationBody}
          ></FinalistKata>
        </div>
      ) : (
        ""
      )}
      <div className={`${kataOrKihon === "Kihon Finais " ? styles.kihon : ""}`}>
        <FinalistClub
          match={match}
          kataOrKihon={kataOrKihon}
          setClubName={setClubName}
        ></FinalistClub>
      </div>
    </div>
  );
}
