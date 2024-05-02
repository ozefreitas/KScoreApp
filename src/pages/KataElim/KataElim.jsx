import Header from "../../components/Header";
import CompCard from "./CompCard/CompCard";
import CustomNotification from "../../components/CustomNotification/CustomNotification";

export default function KataElim({
  match,
  competitors,
  katas,
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
        match="kata"
        isDefault={isDefault}
        setIsDefault={setIsDefault}
      ></Header>
      <CompCard
        match={match}
        competitors={competitors}
        katas={katas}
        setShowNotification={setShowNotification}
        setNotificationTitle={setNotificationTitle}
        setNotificationBody={setNotificationBody}
      ></CompCard>
    </div>
  );
}
