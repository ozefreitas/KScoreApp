import CompNumber from "./CompNumber";
import CompClub from "./CompClub";
import styles from "./compinfo.module.css"

export default function CompInfo({ id }) {
  return (
    <div className={styles.compInfoContainer}>
      <CompNumber id={id}></CompNumber>
      <CompClub id={id}></CompClub>
    </div>
  );
}
