import styles from "./akascore.module.css";
import { useCallback, useEffect } from "react";

export default function AkaScore({ id, akaScore, setAkaScore, winner }) {
  const handleKeyPress = useCallback(
    (event) => {
      const numberKeys = ["0", "1", "2", "3", "4", "5"];
      if (event.ctrlKey && numberKeys.some((anyKey) => event.key === anyKey)) {
        event.preventDefault();
        setAkaScore(event.key);
      }

      if (event.key === "Backspace" && event.ctrlKey) {
        setAkaScore("");
      }
    },
    [setAkaScore]
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
    <div
      className={`${styles.bigNumberContainer} ${
        winner.aka ? styles.blinking : ""
      }`}
    >
      <input
        min="0"
        max="5"
        placeholder="0"
        className={`${styles.bigNumber} ${
          id === "aka" ? styles.white : styles.black
        }`}
        type="number"
        value={akaScore}
        readOnly
        // onChange={(e) => setAkaScore(e.target.value)}
      />
    </div>
  );
}
