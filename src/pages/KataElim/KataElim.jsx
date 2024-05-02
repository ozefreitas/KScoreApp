import Header from "../../components/Header/Header";
import CompCard from "./CompCard/CompCard";
import CustomNotification from "../../components/CustomNotification/CustomNotification";
import FileMissing from "../../components/FileMissing/FileMissing";
import { useEffect } from "react";

export default function KataElim({
  match,
  competitors,
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
}) {
  useEffect(() => {
    setBlinking(false);
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
        match="kata"
        isDefault={isDefault}
        setIsDefault={setIsDefault}
      ></Header>
      {competitors.length !== 0 ? (
        <CompCard
          match={match}
          competitors={competitors}
          katas={katas}
          setShowNotification={setShowNotification}
          setNotificationTitle={setNotificationTitle}
          setNotificationBody={setNotificationBody}
        ></CompCard>
      ) : (
        <FileMissing
          match={match}
          blinking={blinking}
          setBlinking={setBlinking}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        ></FileMissing>
      )}
    </div>
  );
}
