import { useEffect, useState } from "react";
import styles from "./shiroscore.module.css";

export default function ShiroScore({ id, akaScore }) {
  const [shiroScore, setShiroScore] = useState(0);
  useEffect(() => {
    if (akaScore === "0") {
      setShiroScore(5);
    } else if (akaScore === "1") {
      setShiroScore(4);
    } else if (akaScore === "2") {
      setShiroScore(3);
    } else if (akaScore === "3") {
      setShiroScore(2);
    } else if (akaScore === "4") {
      setShiroScore(1);
    } else if (akaScore === "5") {
      setShiroScore(0);
    }
  }, [akaScore]);
  return (
    <div className={styles.bigNumberContainer}>
      <input
        min="0"
        max="5"
        placeholder="0"
        className={`${styles.bigNumber} ${
          id === "aka" ? styles.white : styles.black
        }`}
        type="number"
        value={akaScore ? shiroScore : ""}
        readOnly
      />
    </div>
  );
}
