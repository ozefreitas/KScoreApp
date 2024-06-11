import styles from "./shiroscore.module.css";
import { useEffect } from "react";

export default function ShiroScore({
  shiroWazaari,
  shiroIppon,
  shiroScore,
  setShiroScore,
  winner,
  setWinner,
}) {
  useEffect(() => {
    setShiroScore(parseInt(shiroIppon) * 2 + parseInt(shiroWazaari));
    if (parseInt(shiroIppon) * 2 + parseInt(shiroWazaari) >= 3) {
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
