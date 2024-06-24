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
  category,
  setCategory,
  isDefault,
  setIsDefault,
  modality,
  setModality,
  matchType,
  setMatchType,
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

  useEffect(() => {
    if (match === "kumite") {
      setModality("Individual");
    } else {
      setModality("Equipa");
    }
    setMatchType("Kumite");
  });

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
        category={category}
        setCategory={setCategory}
        isDefault={isDefault}
        setIsDefault={setIsDefault}
        modality={modality}
        matchType={matchType}
      ></Header>
      {competitors.length !== 0 || match === "teamkumite" ? (
        <div>
          <KumiteCompCard
            match={match}
            competitors={competitors}
            winner={winner}
          ></KumiteCompCard>
          <div className={styles.kumiteInfoMainContainer}>
            <AkaInfo
              category={category}
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
              category={category}
              setShowNotification={setShowNotification}
              setNotificationTitle={setNotificationTitle}
              setNotificationBody={setNotificationBody}
              akaScore={akaScore}
              shiroScore={shiroScore}
              winner={winner}
              setWinner={setWinner}
              akaWazaari={akaWazaari}
              setAkaWazaari={setAkaWazaari}
              akaIppon={akaIppon}
              setAkaIppon={setAkaIppon}
              akaSquares={akaSquares}
              setAkaSquares={setAkaSquares}
              shiroWazaari={shiroWazaari}
              setShiroWazaari={setShiroWazaari}
              shiroIppon={shiroIppon}
              setShiroIppon={setShiroIppon}
              shiroSquares={shiroSquares}
              setShiroSquares={setShiroSquares}
            ></Time>
            <ShiroInfo
              category={category}
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
