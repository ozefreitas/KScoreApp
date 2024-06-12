import Header from "../../components/Header/Header";
import CompCard from "./CompCard/CompCard";
import CustomNotification from "../../components/CustomNotification/CustomNotification";
import FileMissing from "../../components/FileMissing/FileMissing";
import { useEffect } from "react";

export default function KataElim({
  match,
  tatami,
  setTatami,
  competitors,
  katas,
  isMenuOpen,
  setIsMenuOpen,
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
  kataRef,
}) {
  useEffect(() => {
    setBlinking((prevState) => ({
      ...prevState,
      comp: false,
      kata: false,
    }));
    setIsMenuOpen(false);
  }, [competitors, katas, setBlinking, setIsMenuOpen]);

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
        tatami={tatami}
        setTatami={setTatami}
        isDefault={isDefault}
        setIsDefault={setIsDefault}
      ></Header>
      {competitors.length !== 0 && katas.length !== 0 ? (
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
          competitors={competitors}
          katas={katas}
          setBlinking={setBlinking}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          compRef={compRef}
          kataRef={kataRef}
        ></FileMissing>
      )}
    </div>
  );
}
