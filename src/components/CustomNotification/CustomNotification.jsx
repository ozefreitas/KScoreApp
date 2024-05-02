import styles from "./customnotification.module.css";
import { useEffect, useCallback } from "react";

export default function CustomNotification({
  setShowNotification,
  title,
  body,
}) {
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Escape" || event.key === "Enter") {
        setShowNotification(false)
      }
    },
    [setShowNotification]
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  return (
    <div className={styles.wideBody}>
      <div className={styles.notificationMainBody}>
        <div className={styles.notificationHeader}>
          <div className={styles.notificationTitle}>{title}</div>
          <button
            className={styles.closingArrow}
            onClick={() => setShowNotification(false)}
          >
            X
          </button>
        </div>
        <div className={styles.notificationBody}>
          {body}
          <button
            className={styles.closeButton}
            onClick={() => setShowNotification(false)}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
