import Header from "../../components/Header/Header";
import TeamCard from "./TeamCard/TeamCard";
import PontCard from "../../components/PontCard/PontCard";
import styles from "./teamkata.module.css";
import FinalPont from "../../components/FinalPont/FinalPont";
import { useState, useEffect } from "react";
import CustomNotification from "../../components/CustomNotification/CustomNotification";
import FileMissing from "../../components/FileMissing/FileMissing";

export default function TeamKata({
  match,
  tatami,
  setTatami,
  katas,
  isMenuOpen,
  setIsMenuOpen,
  blinking,
  setBlinking,
  isDefault,
  setIsDefault,
  modality,
  setModality,
  showNotification,
  setShowNotification,
  notificationTitle,
  setNotificationTitle,
  notificationBody,
  setNotificationBody,
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
  const [kataOrKihon, setKataOrKihon] = useState("Kata Equipa ");

  useEffect(() => {
    setBlinking((prevState) => ({
      ...prevState,
      kata: false,
    }));
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
  }, [katas, setBlinking, setIsMenuOpen, minIndex, maxIndex]);

  useEffect(() => {
    setModality("Equipa");
  });

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
        match={match}
        tatami={tatami}
        setTatami={setTatami}
        isDefault={isDefault}
        setIsDefault={setIsDefault}
        modality={modality}
        kataOrKihon={kataOrKihon}
        setKataOrKihon={setKataOrKihon}
      ></Header>
      {katas.length !== 0 || kataOrKihon === "Kihon Finais " ? (
        <div className={styles.flexContainer}>
          <div className={styles.bigContainer}>
            <TeamCard
              match={match}
              katas={katas}
              setShowNotification={setShowNotification}
              setNotificationTitle={setNotificationTitle}
              setNotificationBody={setNotificationBody}
              kataOrKihon={kataOrKihon}
            ></TeamCard>
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
      ) : katas.length === 0 && kataOrKihon === "Kata Equipa " ? (
        <FileMissing
          match={match}
          katas={katas}
          blinking={blinking}
          setBlinking={setBlinking}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          kataRef={kataRef}
        ></FileMissing>
      ) : (
        ""
      )}
    </div>
  );
}
