import styles from "./customnotification.module.css";

export default function CustomNotification({
  setShowNotification,
  title,
  body,
}) {
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
