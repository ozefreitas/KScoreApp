import Header from "../../components/Header/Header";
import AkaInfo from "./AkaInfo/AkaInfo";
import KumiteCompCard from "./KumiteCompCard/KumiteCompCard";
import ShiroInfo from "./ShiroInfo/ShiroInfo";
import Time from "./Time/Time";
import styles from "./kumite.module.css";
import CustomNotification from "../../components/CustomNotification/CustomNotification";
import FileMissing from "../../components/FileMissing/FileMissing";
import { useEffect, useState } from "react";

export default function Kumite({
  competitors,
  match,
  tatami,
  setTatami,
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
  compRef,
}) {
  const [akaWazaari, setAkaWazaari] = useState(0);
  const [akaIppon, setAkaIppon] = useState(0);
  const [akaScore, setAkaScore] = useState(0);
  const [shiroWazaari, setShiroWazaari] = useState(0);
  const [shiroIppon, setShiroIppon] = useState(0);
  const [shiroScore, setShiroScore] = useState(0);
  const [winner, setWinner] = useState({ aka: false, shiro: false });
  const [akaSquares, setAkaSquares] = useState({
    squaresK: [],
    squaresJ: [],
    squaresM: [],
  });
  const [shiroSquares, setShiroSquares] = useState({
    squaresK: [],
    squaresJ: [],
    squaresM: [],
  });

  const isInputFocused = () => {
    return document.activeElement.tagName.toLowerCase() === "input";
  };

  const handleKeyPress = (event) => {
    if (event.key === "Backspace" && event.ctrlKey && !isInputFocused()) {
      setWinner({ aka: false, shiro: false });
      setAkaIppon(0);
      setAkaWazaari(0);
      setAkaSquares({
        squaresK: [],
        squaresJ: [],
        squaresM: [],
      });
      setShiroIppon(0);
      setShiroWazaari(0);
      setShiroSquares({
        squaresK: [],
        squaresJ: [],
        squaresM: [],
      });
    }
  };

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    setBlinking((prevState) => ({
      ...prevState,
      comp: false,
    }));
    setIsMenuOpen(false);
  }, [competitors, setBlinking, setIsMenuOpen]);

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
      {competitors.length !== 0 ? (
        <div>
          <KumiteCompCard
            match={match}
            competitors={competitors}
            winner={winner}
          ></KumiteCompCard>
          <div className={styles.kumiteInfoMainContainer}>
            <AkaInfo
              akaWazaari={akaWazaari}
              setAkaWazaari={setAkaWazaari}
              akaIppon={akaIppon}
              setAkaIppon={setAkaIppon}
              setShiroWazaari={setShiroWazaari}
              akaSquares={akaSquares}
              setAkaSquares={setAkaSquares}
              akaScore={akaScore}
              setAkaScore={setAkaScore}
              winner={winner}
              setWinner={setWinner}
            ></AkaInfo>
            <Time
              match={match}
              setShowNotification={setShowNotification}
              setNotificationTitle={setNotificationTitle}
              setNotificationBody={setNotificationBody}
              akaScore={akaScore}
              shiroScore={shiroScore}
              winner={winner}
              setWinner={setWinner}
            ></Time>
            <ShiroInfo
              setAkaWazaari={setAkaWazaari}
              shiroWazaari={shiroWazaari}
              setShiroWazaari={setShiroWazaari}
              shiroIppon={shiroIppon}
              setShiroIppon={setShiroIppon}
              shiroSquares={shiroSquares}
              setShiroSquares={setShiroSquares}
              shiroScore={shiroScore}
              setShiroScore={setShiroScore}
              winner={winner}
              setWinner={setWinner}
            ></ShiroInfo>
          </div>
        </div>
      ) : (
        <FileMissing
          competitors={competitors}
          blinking={blinking}
          setBlinking={setBlinking}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          compRef={compRef}
        ></FileMissing>
      )}
    </div>
  );
}
