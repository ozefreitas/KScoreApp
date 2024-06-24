import styles from "./shiroscore.module.css";
import { useEffect, useState } from "react";

export default function ShiroScore({
  category,
  shiroWazaari,
  shiroIppon,
  shiroScore,
  setShiroScore,
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
    setShiroScore(parseInt(shiroIppon) * 2 + parseInt(shiroWazaari));
    if (parseInt(shiroIppon) * 2 + parseInt(shiroWazaari) >= maxScore) {
      setWinner({ ...winner, shiro: true });
    } else {
      setWinner({ ...winner, shiro: false });
    }
  }, [shiroIppon, shiroWazaari]);
  return (
    <div
      className={`${styles.pointNumberContainer} ${
        winner.shiro ? styles.blinking : ""
      }`}
    >
      <input type="number" placeholder="0" value={shiroScore} readOnly />
    </div>
  );
}
