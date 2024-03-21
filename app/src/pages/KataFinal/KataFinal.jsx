import Header from "../../components/Header";
import FinalistCard from "./FinalistCard/FinalistCard";
import FinalPont from "./FinalPont/FinalPont";
import PontCard from "./PontCard/PontCard";
import styles from "./katafinal.module.css";
import { useState } from "react";

export default function KataFinal({ competitors, katas }) {
  const [sumScore, setSumScore] = useState({});
  return (
    <div>
      <Header></Header>
      <div className={styles.flexContainer}>
        <div className={styles.bigContainer}>
          <FinalistCard competitors={competitors} katas={katas}></FinalistCard>
          <div className={styles.pontsContainer}>
            <PontCard judge="1" setSumScore={setSumScore}></PontCard>
            <PontCard judge="2" setSumScore={setSumScore}></PontCard>
            <PontCard judge="3" setSumScore={setSumScore}></PontCard>
            <PontCard judge="4" setSumScore={setSumScore}></PontCard>
            <PontCard judge="5" setSumScore={setSumScore}></PontCard>
          </div>
        </div>
        <FinalPont sumScore={sumScore}></FinalPont>
      </div>
    </div>
  );
}
