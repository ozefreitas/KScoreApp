import { useEffect } from "react";
import Kumite from "../Kumite/Kumite";

export default function TeamKumite({
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
  useEffect(() => {
    setModality("Equipa");
  });
  return (
    <div>
      <Kumite
        match={match}
        tatami={tatami}
        setTatami={setTatami}
        competitors={competitors}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        blinking={blinking}
        setBlinking={setBlinking}
        isDefault={isDefault}
        setIsDefault={setIsDefault}
        modality={modality}
        setModality={setModality}
        matchType={matchType}
        setMatchType={setMatchType}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        notificationTitle={notificationTitle}
        setNotificationTitle={setNotificationTitle}
        notificationBody={notificationBody}
        setNotificationBody={setNotificationBody}
        compRef={compRef}
      ></Kumite>
    </div>
  );
}
