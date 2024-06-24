import Header from "../../components/Header/Header";
import FinalistCard from "./FinalistCard/FinalistCard";
import FinalPont from "../../components/FinalPont/FinalPont";
import PontCard from "../../components/PontCard/PontCard";
import styles from "./katafinal.module.css";
import { isInputFocused } from "../../utils";
import { useState, useEffect, useCallback } from "react";
import CustomNotification from "../../components/CustomNotification/CustomNotification";
import FileMissing from "../../components/FileMissing/FileMissing";
import Classification from "../../components/Classification/Classification";

export default function KataFinal({
  match,
  tatami,
  setTatami,
  competitors,
  katas,
  isMenuOpen,
  setIsMenuOpen,
  blinking,
  setBlinking,
  isDefault,
  setIsDefault,
  category,
  setCategory,
  matchType,
  setMatchType,
  showNotification,
  setShowNotification,
  notificationTitle,
  setNotificationTitle,
  notificationBody,
  setNotificationBody,
  showClassification,
  setShowClassification,
  compRef,
  kataRef,
}) {
  const [activeComp, setActiveComp] = useState({
    competitorName: "",
    competitorTeam: "",
    competitorNumber: 0,
  });
  const [sumScore, setSumScore] = useState({});
  const [minIndex, setMinIndex] = useState("");
  const [maxIndex, setMaxIndex] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const [overline, setOverline] = useState({
    overline1: undefined,
    overline2: undefined,
    overline3: undefined,
    overline4: undefined,
    overline5: undefined,
  });
  const [activeCard, setActiveCard] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
    card5: false,
  });
  const [results, setResults] = useState({});
  console.log(results);

  useEffect(() => {
    setMatchType("Kata");
  });

  useEffect(() => {
    setBlinking((prevState) => ({
      ...prevState,
      comp: false,
      kata: false,
    }));
    setIsMenuOpen(false);
    if (minIndex !== "" && maxIndex !== "") {
      setOverline((prevState) => ({
        ...prevState,
        [`overline${minIndex}`]: true,
      }));
      setOverline((prevState) => ({
        ...prevState,
        [`overline${maxIndex}`]: true,
      }));
    }
  }, [competitors, katas, setBlinking, setIsMenuOpen, minIndex, maxIndex]);

  const tiebreaker = () => {
    let toConsider = Object.values(sumScore);
    toConsider.splice(maxIndex - 1, 1);
    toConsider.splice(minIndex - 1, 1);
    let minvalue = Infinity;
    let maxvalue = -Infinity;
    for (const value of toConsider) {
      if (value < minvalue) {
        minvalue = value;
      }
      if (value > maxvalue) {
        maxvalue = value;
      }
    }
    return [minvalue, maxvalue];
  };

  const handleMousePress = (event) => {
    setActiveCard({
      card1: false,
      card2: false,
      card3: false,
      card4: false,
      card5: false,
    });
    const elementsIds = ["1", "2", "3", "4", "5"];
    if (elementsIds.includes(document.activeElement.id)) {
      const activeElementCard = `card${document.activeElement.id}`;
      const newActiveCard = {
        card1: false,
        card2: false,
        card3: false,
        card4: false,
        card5: false,
      };
      newActiveCard[activeElementCard] = true;
      setActiveCard(newActiveCard);
    }
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && event.ctrlKey && !isInputFocused()) {
        const key = `${activeComp.competitorNumber}-${activeComp.competitorName}-${activeComp.competitorTeam}`;
        if (!Object.keys(results).includes(key)) {
          const [tieMin, tieMax] = tiebreaker();
          setResults({
            ...results,
            [key]: {
              final: finalScore.toFixed(1),
              min: tieMin,
              max: tieMax,
              obs: "",
            },
          });
        } else {
          setShowNotification(true);
          setNotificationTitle("ERRO - Resultado repetido");
          setNotificationBody("Pontuação já adicionada à lista de resultados.");
        }
      } else if (event.code === "Delete") {
        setResults({});
      } else if (event.code === "KeyQ" && event.ctrlKey && !isInputFocused()) {
        setShowClassification((prevClassification) => !prevClassification);
      } else if (
        event.code === "Backspace" &&
        event.ctrlKey &&
        !isInputFocused()
      ) {
        setSumScore({});
        setMaxIndex("");
        setMinIndex("");
        setFinalScore(0);
        setOverline({
          overline1: undefined,
          overline2: undefined,
          overline3: undefined,
          overline4: undefined,
          overline5: undefined,
        });
        document.getElementById("pont_form").reset();
      }
      setActiveCard({
        card1: false,
        card2: false,
        card3: false,
        card4: false,
        card5: false,
      });
      const elementsIds = ["1", "2", "3", "4", "5"];
      if (elementsIds.includes(document.activeElement.id)) {
        const activeElementCard = `card${document.activeElement.id}`;
        const newActiveCard = {
          card1: false,
          card2: false,
          card3: false,
          card4: false,
          card5: false,
        };
        newActiveCard[activeElementCard] = true;
        setActiveCard(newActiveCard);
      }
    },
    [activeComp, finalScore, results]
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener("mouseup", handleMousePress);
    document.addEventListener("keyup", handleKeyPress);
    // remove the event listener
    return () => {
      document.removeEventListener("mouseup", handleMousePress);
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleMousePress, handleKeyPress]);

  return (
    <div>
      {showNotification ? (
        <CustomNotification
          setShowNotification={setShowNotification}
          title={notificationTitle}
          body={notificationBody}
        ></CustomNotification>
      ) : (
        ""
      )}
      {!showClassification ? (
        <>
          <Header
            match="kata"
            tatami={tatami}
            setTatami={setTatami}
            isDefault={isDefault}
            setIsDefault={setIsDefault}
            category={category}
            setCategory={setCategory}
            matchType={matchType}
          ></Header>
          {competitors.length !== 0 && katas.length !== 0 ? (
            <div className={styles.flexContainer}>
              <div className={styles.bigContainer}>
                <FinalistCard
                  match={match}
                  competitors={competitors}
                  katas={katas}
                  state={activeComp}
                  setState={setActiveComp}
                  setShowNotification={setShowNotification}
                  setNotificationTitle={setNotificationTitle}
                  setNotificationBody={setNotificationBody}
                ></FinalistCard>
                <form id="pont_form" className={styles.pontsContainer}>
                  <PontCard
                    judge="1"
                    active={activeCard.card1}
                    overline={overline.overline1}
                    setSumScore={setSumScore}
                  ></PontCard>
                  <PontCard
                    judge="2"
                    active={activeCard.card2}
                    overline={overline.overline2}
                    setSumScore={setSumScore}
                  ></PontCard>
                  <PontCard
                    judge="3"
                    active={activeCard.card3}
                    overline={overline.overline3}
                    setSumScore={setSumScore}
                  ></PontCard>
                  <PontCard
                    judge="4"
                    active={activeCard.card4}
                    overline={overline.overline4}
                    setSumScore={setSumScore}
                  ></PontCard>
                  <PontCard
                    judge="5"
                    active={activeCard.card5}
                    overline={overline.overline5}
                    setSumScore={setSumScore}
                  ></PontCard>
                </form>
              </div>
              <FinalPont
                sumScore={sumScore}
                setOverline={setOverline}
                setSumScore={setSumScore}
                setMinIndex={setMinIndex}
                setMaxIndex={setMaxIndex}
                finalScore={finalScore}
                setFinalScore={setFinalScore}
                setShowNotification={setShowNotification}
                setNotificationTitle={setNotificationTitle}
                setNotificationBody={setNotificationBody}
              ></FinalPont>
            </div>
          ) : (
            <FileMissing
              match={match}
              competitors={competitors}
              katas={katas}
              blinking={blinking}
              setBlinking={setBlinking}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              compRef={compRef}
              kataRef={kataRef}
            ></FileMissing>
          )}
        </>
      ) : (
        <Classification
          category={category}
          match="Kata"
          results={results}
        ></Classification>
      )}
    </div>
  );
}
