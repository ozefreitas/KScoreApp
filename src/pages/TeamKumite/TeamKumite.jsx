import Kumite from "../Kumite/Kumite";

export default function TeamKumite({
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
      <Kumite
        match={match}
        competitors={competitors}
        isDefault={isDefault}
        setIsDefault={setIsDefault}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        notificationTitle={notificationTitle}
        setNotificationTitle={setNotificationTitle}
        notificationBody={notificationBody}
        setNotificationBody={setNotificationBody}
      ></Kumite>
    </div>
  );
}
