import styles from "./finalistkata.module.css";
import { useState, useCallback, useEffect } from "react";

export default function FinalistKata({ setState, katas, styling }) {
  const [kataNumber, setKataNumber] = useState("");
  const kataAccepted = [];

  katas.map((kata) => {
    kataAccepted.push(kata.kata_number);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (kataNumber === "") {
      new window.Notification("ERRO", {body: "Insira o número do Kata"})
    } else if (!kataAccepted.includes(kataNumber)) {
      new window.Notification("ERRO", {body: "Número incorreto / Número não existe na lista de katas"})
    }
    katas.map((kata) => {
      if (kata.kata_number === kataNumber) {
        setKataNumber(kata.kata_name);
      }
    });
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.ctrlKey === true && event.key === "Backspace") {
        document.getElementById("number_form").reset();
        setKataNumber("");
        setState((prevState) => ({
          ...prevState,
          competitorName: "",
          competitorTeam: "",
        }));
      }
    },
    [setState]
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
    <div className={`${styles.kataContainer} ${styles[styling]}`}>
      <form onSubmit={handleSubmit} className={styles[styling]}>
        <div className={styles[styling]}>
          <input
            placeholder="Kata Name"
            className={`${styles.kataName} ${styles[styling]}`}
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
