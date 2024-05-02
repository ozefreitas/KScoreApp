import Kumite from "../Kumite/Kumite";

export default function TeamKumite({
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
  return (
    <div>
      <Kumite
        match={match}
        competitors={competitors}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        blinking={blinking}
        setBlinking={setBlinking}
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
