import FinalistClub from "../FinalistClub/FinalistClub";
import FinalistKata from "../FinalistKata/FinalistKata";
import FinalistName from "../FinalistName/FinalistName";
import FinalistNumber from "../FinalistNumber/FinalistNumber";
import styles from "./finalistcard.module.css";
import { useState } from "react";

export default function FinalistCard({
  match,
  competitors,
  katas,
  setShowNotification,
  setNotificationTitle,
  setNotificationBody,
}) {
  const [state, setState] = useState({
    competitorName: "",
    competitorTeam: "",
    competitorNumber: 0,
  });

  return (
    <div className={styles.finalistCard}>
      <div>
        <FinalistName state={state}></FinalistName>
        <FinalistKata
          setState={setState}
          katas={katas}
          setShowNotification={setShowNotification}
          setNotificationTitle={setNotificationTitle}
          setNotificationBody={setNotificationBody}
        ></FinalistKata>
      </div>
      <div>
        <FinalistClub match={match} state={state}></FinalistClub>
        <form className={styles.numberForm} id="number_form">
          <FinalistNumber
            state={state}
            setState={setState}
            competitors={competitors}
          ></FinalistNumber>
        </form>
      </div>
    </div>
  );
}
