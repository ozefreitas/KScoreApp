import Header from "../../components/Header";
import FinalistCard from "./FinalistCard/FinalistCard";
import FinalPont from "../../components/FinalPont/FinalPont";
import PontCard from "../../components/PontCard/PontCard";
import styles from "./katafinal.module.css";
import { useState } from "react";

export default function KataFinal({ competitors, katas }) {
  const [sumScore, setSumScore] = useState({});
  return (
    <div>
      <Header match="kata"></Header>
      <div className={styles.flexContainer}>
        <div className={styles.bigContainer}>
          <FinalistCard competitors={competitors} katas={katas}></FinalistCard>
          <form id="pont_form" className={styles.pontsContainer}>
            <PontCard judge="1" setSumScore={setSumScore}></PontCard>
            <PontCard judge="2" setSumScore={setSumScore}></PontCard>
            <PontCard judge="3" setSumScore={setSumScore}></PontCard>
            <PontCard judge="4" setSumScore={setSumScore}></PontCard>
            <PontCard judge="5" setSumScore={setSumScore}></PontCard>
          </form>
        </div>
        <FinalPont sumScore={sumScore} setSumScore={setSumScore}></FinalPont>
      </div>
    </div>
  );
}
