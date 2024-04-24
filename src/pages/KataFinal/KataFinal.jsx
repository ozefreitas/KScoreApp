import Header from "../../components/Header";
import FinalistCard from "./FinalistCard/FinalistCard";
import FinalPont from "../../components/FinalPont/FinalPont";
import PontCard from "../../components/PontCard/PontCard";
import styles from "./katafinal.module.css";
import { useState, useEffect } from "react";

export default function KataFinal({ match, competitors, katas }) {
  const [sumScore, setSumScore] = useState({});
  const [minIndex, setMinIndex] = useState("");
  const [maxIndex, setMaxIndex] = useState("");
  const [state, setState] = useState({
    overline1: undefined,
    overline2: undefined,
    overline3: undefined,
    overline4: undefined,
    overline5: undefined,
  });

  useEffect(() => {
    if (minIndex !== "" && maxIndex !== "") {
      setState((prevState) => ({
        ...prevState,
        [`overline${minIndex}`]: true,
      }));
      setState((prevState) => ({
        ...prevState,
        [`overline${maxIndex}`]: true,
      }));
    }
  }, [minIndex, maxIndex]);

  return (
    <div>
      <Header match="kata"></Header>
      <div className={styles.flexContainer}>
        <div className={styles.bigContainer}>
          <FinalistCard
            match={match}
            competitors={competitors}
            katas={katas}
          ></FinalistCard>
          <form id="pont_form" className={styles.pontsContainer}>
            <PontCard
              judge="1"
              overline={state.overline1}
              setSumScore={setSumScore}
            ></PontCard>
            <PontCard
              judge="2"
              overline={state.overline2}
              setSumScore={setSumScore}
            ></PontCard>
            <PontCard
              judge="3"
              overline={state.overline3}
              setSumScore={setSumScore}
            ></PontCard>
            <PontCard
              judge="4"
              overline={state.overline4}
              setSumScore={setSumScore}
            ></PontCard>
            <PontCard
              judge="5"
              overline={state.overline5}
              setSumScore={setSumScore}
            ></PontCard>
          </form>
        </div>
        <FinalPont
          sumScore={sumScore}
          setState={setState}
          setSumScore={setSumScore}
          setMinIndex={setMinIndex}
          setMaxIndex={setMaxIndex}
        ></FinalPont>
      </div>
    </div>
  );
}
