import FinalistClub from "../FinalistClub/FinalistClub";
import FinalistKata from "../FinalistKata/FinalistKata";
import FinalistName from "../FinalistName/FinalistName";
import FinalistNumber from "../FinalistNumber/FinalistNumber";
import styles from "./finalistcard.module.css";
import { useState } from "react";

export default function FinalistCard({ competitors, katas }) {
  const [state, setState] = useState({
    competitorName: "",
    competitorTeam: "",
    competitorNumber: 0,
  });

  return (
    <div className={styles.finalistCard}>
      <div>
        <FinalistName state={state}></FinalistName>
        <FinalistKata setState={setState} katas={katas}></FinalistKata>
      </div>
      <div>
        <FinalistClub state={state}></FinalistClub>
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
