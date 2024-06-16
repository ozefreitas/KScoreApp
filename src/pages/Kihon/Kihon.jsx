import CustomNotification from "../../components/CustomNotification/CustomNotification";
import Header from "../../components/Header/Header";
import CompCard from "../KataElim/CompCard/CompCard";
import { useEffect } from "react";

export default function Kihon({
  match,
  tatami,
  setTatami,
  isDefault,
  setIsDefault,
  modality,
  setModality,
  showNotification,
  setShowNotification,
  notificationTitle,
  setNotificationTitle,
  notificationBody,
  setNotificationBody,
}) {
  useEffect(() => {
    setModality("Equipa");
  });

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
        modality={modality}
      ></Header>
      <CompCard
        match={match}
        setShowNotification={setShowNotification}
        setNotificationTitle={setNotificationTitle}
        setNotificationBody={setNotificationBody}
      ></CompCard>
    </div>
  );
}
