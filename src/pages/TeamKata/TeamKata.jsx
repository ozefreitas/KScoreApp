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
  const [state, setState] = useState({
    overline1: undefined,
    overline2: undefined,
    overline3: undefined,
    overline4: undefined,
    overline5: undefined,
  });

  useEffect(() => {
    setBlinking((prevState) => ({
      ...prevState,
      kata: false,
    }));
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
  }, [katas, setBlinking, setIsMenuOpen, minIndex, maxIndex]);

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
      ></Header>
      {katas.length !== 0 ? (
        <div className={styles.flexContainer}>
          <div className={styles.bigContainer}>
            <TeamCard
              match={match}
              katas={katas}
              setShowNotification={setShowNotification}
              setNotificationTitle={setNotificationTitle}
              setNotificationBody={setNotificationBody}
            ></TeamCard>
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
            setShowNotification={setShowNotification}
            setNotificationTitle={setNotificationTitle}
            setNotificationBody={setNotificationBody}
          ></FinalPont>
        </div>
      ) : (
        <FileMissing
          match={match}
          katas={katas}
          blinking={blinking}
          setBlinking={setBlinking}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          kataRef={kataRef}
        ></FileMissing>
      )}
    </div>
  );
}
