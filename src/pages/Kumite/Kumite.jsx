import Header from "../../components/Header/Header";
import AkaInfo from "./AkaInfo/AkaInfo";
import KumiteCompCard from "./KumiteCompCard/KumiteCompCard";
import ShiroInfo from "./ShiroInfo/ShiroInfo";
import Time from "./Time/Time";
import styles from "./kumite.module.css";
import CustomNotification from "../../components/CustomNotification/CustomNotification";
import FileMissing from "../../components/FileMissing/FileMissing";
import { useEffect } from "react";

export default function Kumite({
  competitors,
  match,
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
}) {
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
        isDefault={isDefault}
        setIsDefault={setIsDefault}
      ></Header>

      {competitors.length !== 0 ? (
        <div>
          <KumiteCompCard
            match={match}
            competitors={competitors}
          ></KumiteCompCard>
          <div className={styles.kumiteInfoMainContainer}>
            <AkaInfo></AkaInfo>
            <Time match={match}></Time>
            <ShiroInfo></ShiroInfo>
          </div>
        </div>
      ) : (
        <FileMissing
          competitors={competitors}
          blinking={blinking}
          setBlinking={setBlinking}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        ></FileMissing>
      )}
    </div>
  );
}
