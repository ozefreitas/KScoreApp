import { useEffect } from "react";
import styles from "./akascore.module.css";

export default function AkaScore({
  akaWazaari,
  akaIppon,
  akaScore,
  setAkaScore,
  winner,
  setWinner,
}) {
  useEffect(() => {
    setAkaScore(parseInt(akaIppon) * 2 + parseInt(akaWazaari));
    if (parseInt(akaIppon) * 2 + parseInt(akaWazaari) >= 3) {
      setWinner({ ...winner, aka: true });
    } else {
      setWinner({ ...winner, aka: false });
    }
  }, [akaIppon, akaWazaari]);

  return (
    <div
      className={`${styles.pointNumberContainer} ${
        winner.aka ? styles.blinking : ""
      }`}
    >
      <input type="number" placeholder="0" value={akaScore} readOnly />
    </div>
  );
}
