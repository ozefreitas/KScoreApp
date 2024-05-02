import styles from "./kataname.module.css";
import { useState, useEffect, useCallback } from "react";

export default function KataName({
  id,
  katas,
  setShowNotification,
  setNotificationTitle,
  setNotificationBody,
}) {
  const [kataNumber, setKataNumber] = useState("");
  const kataAccepted = [];

  katas.map((kata) => {
    kataAccepted.push(kata.kata_number);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (kataNumber === "") {
      setShowNotification(true);
      setNotificationTitle("Erro de Input");
      setNotificationBody("Insira o número do Kata");
    } else if (!kataAccepted.includes(kataNumber)) {
      setShowNotification(true);
      setNotificationTitle("Erro de Input");
      setNotificationBody(
        "Número incorreto / Número não existe na lista de katas"
      );
    }
    katas.map((kata) => {
      if (id === "aka") {
        if (kata.kata_number === kataNumber) {
          setKataNumber(kata.kata_name);
        }
      } else {
        if (kata.kata_number === kataNumber) {
          setKataNumber(kata.kata_name);
        }
      }
    });
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.code === "Backspace" && event.ctrlKey) {
        setKataNumber("");
      }
    },
    [setKataNumber]
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
    <form onSubmit={handleSubmit}>
      <div className={styles.upperLayer}>
        <input
          placeholder="Nome Kata"
          className={`${styles.kataName} ${
            id === "aka" ? styles.white : styles.black
          }`}
          type="text"
          onChange={(e) => setKataNumber(e.target.value)}
          value={kataNumber}
        />
        <button className={styles.kataButton} type="submit">
          Zerar Kata Name
        </button>
      </div>
    </form>
  );
}
