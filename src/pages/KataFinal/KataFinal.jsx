import Header from "../../components/Header/Header";
import FinalistCard from "./FinalistCard/FinalistCard";
import FinalPont from "../../components/FinalPont/FinalPont";
import PontCard from "../../components/PontCard/PontCard";
import styles from "./katafinal.module.css";
import { useState, useEffect } from "react";
import CustomNotification from "../../components/CustomNotification/CustomNotification";
import FileMissing from "../../components/FileMissing/FileMissing";

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
  matchType,
  setMatchType,
  showNotification,
  setShowNotification,
  notificationTitle,
  setNotificationTitle,
  notificationBody,
  setNotificationBody,
  compRef,
  kataRef,
}) {
  const [sumScore, setSumScore] = useState({});
  const [minIndex, setMinIndex] = useState("");
  const [maxIndex, setMaxIndex] = useState("");
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

  const handleKeyPress = (event) => {
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
      <Header
        match="kata"
        tatami={tatami}
        setTatami={setTatami}
        isDefault={isDefault}
        setIsDefault={setIsDefault}
        matchType={matchType}
      ></Header>
      {competitors.length !== 0 && katas.length !== 0 ? (
        <div className={styles.flexContainer}>
          <div className={styles.bigContainer}>
            <FinalistCard
              match={match}
              competitors={competitors}
              katas={katas}
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
    </div>
  );
}
