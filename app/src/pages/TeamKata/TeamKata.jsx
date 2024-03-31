import Header from "../../components/Header";
import TeamCard from "./TeamCard/TeamCard";
import PontCard from "../../components/PontCard/PontCard";
import styles from "./teamkata.module.css";
import FinalPont from "../../components/FinalPont/FinalPont"
import { useState } from "react";

export default function TeamKata({katas}) {
  const [sumScore, setSumScore] = useState({});
  return (
    <div>
      <Header></Header>
      <div className={styles.flexContainer}>
        <div className={styles.bigContainer}>
          <TeamCard katas={katas}></TeamCard>
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
