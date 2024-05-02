import Header from "../../components/Header";
import AkaInfo from "./AkaInfo/AkaInfo";
import KumiteCompCard from "./KumiteCompCard/KumiteCompCard";
import ShiroInfo from "./ShiroInfo/ShiroInfo";
import Time from "./Time/Time";
import styles from "./kumite.module.css";
import CustomNotification from "../../components/CustomNotification/CustomNotification";

export default function Kumite({
  competitors,
  match,
  isDefault,
  setIsDefault,
  showNotification,
  setShowNotification,
  notificationTitle,
  setNotificationTitle,
  notificationBody,
  setNotificationBody,
}) {
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
      <KumiteCompCard match={match} competitors={competitors}></KumiteCompCard>
      <div className={styles.kumiteInfoMainContainer}>
        <AkaInfo></AkaInfo>
        <Time match={match}></Time>
        <ShiroInfo></ShiroInfo>
      </div>
    </div>
  );
}
