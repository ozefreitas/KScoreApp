import styles from "./finalistkata.module.css";
import { useState, useCallback, useEffect } from "react";

export default function FinalistKata({
  setState,
  katas,
  match,
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
      if (kata.kata_number === kataNumber) {
        setKataNumber(kata.kata_name);
      }
    });
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === "Backspace") {
        if (match !== "teamkata") {
          document.getElementById("number_form").reset();
          setKataNumber("");
          setState((prevState) => ({
            ...prevState,
            competitorName: "",
            competitorTeam: "",
            competitorNumber: 0,
          }));
        } else {
          setKataNumber("");
          document.getElementById("club_form").reset();
        }
      }
    },
    [setState, match]
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
    <div className={`${styles.kataContainer} ${styles[match]}`}>
      <form onSubmit={handleSubmit} className={styles[match]}>
        <div className={styles[match]}>
          <input
            placeholder="Nome Kata"
            className={`${styles.kataName} ${styles[match]}`}
            type="text"
            onChange={(e) => setKataNumber(e.target.value)}
            value={kataNumber}
          />
          <button className={styles.kataButton} type="submit">
            Zerar Kata Name
          </button>
        </div>
      </form>
    </div>
  );
}
