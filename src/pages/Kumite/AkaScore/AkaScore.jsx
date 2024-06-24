import { useEffect, useState } from "react";
import styles from "./akascore.module.css";

export default function AkaScore({
  category,
  akaWazaari,
  akaIppon,
  akaScore,
  setAkaScore,
  winner,
  setWinner,
}) {
  const [maxScore, setMaxScore] = useState(3);

  useEffect(() => {
    if (category.includes("Juvenil") || category.includes("Veterano")) {
      setMaxScore(2);
    } else setMaxScore(3);
  }, [category]);

  useEffect(() => {
    setAkaScore(parseInt(akaIppon) * 2 + parseInt(akaWazaari));
    if (parseInt(akaIppon) * 2 + parseInt(akaWazaari) >= maxScore) {
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
