import { useState, useEffect } from "react";
import styles from "./akainfo.module.css";
import AkaScore from "../AkaScore/AkaScore";

export default function AkaInfo() {
  const [akaWazaari, setAkaWazaari] = useState(0);
  const [akaIppon, setAkaIppon] = useState(0);
  const [state, setState] = useState({
    squaresK: [],
    squaresJ: [],
    squaresM: [],
  });

  const isInputFocused = () => {
    return document.activeElement.tagName.toLowerCase() === "input";
  };

  const handleKeyPress = (event) => {
    if (event.key === "k" && !event.ctrlKey && !isInputFocused()) {
      const newArray = [
        ...state.squaresK,
        <div className={styles.foulSquare}></div>,
      ];
      if (newArray.length === 4) {
        return;
      }
      setState((prevState) => ({
        ...prevState,
        squaresK: newArray,
      }));
    } else if (event.key === "j" && !event.ctrlKey && !isInputFocused()) {
      const newArray = [
        ...state.squaresJ,
        <div className={styles.foulSquare}></div>,
      ];
      if (newArray.length === 4) {
        return;
      }
      setState((prevState) => ({
        ...prevState,
        squaresJ: newArray,
      }));
    } else if (event.key === "m" && !event.ctrlKey && !isInputFocused()) {
      const newArray = [
        ...state.squaresM,
        <div className={styles.foulSquare}></div>,
      ];
      if (newArray.length === 4) {
        return;
      }
      setState((prevState) => ({
        ...prevState,
        squaresM: newArray,
      }));
    } else if (event.key === "i" && !event.ctrlKey && !isInputFocused()) {
      setAkaIppon(akaIppon + 1);
    } else if (event.key === "w" && !event.ctrlKey && !isInputFocused()) {
      setAkaWazaari(akaWazaari + 1);
    } else if (
      event.key === "Backspace" &&
      event.ctrlKey &&
      !isInputFocused()
    ) {
      setAkaIppon(0);
      setAkaWazaari(0);
      setState({
        squaresK: [],
        squaresJ: [],
        squaresM: [],
      });
    }
  };

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleDivClick = (foul) => {
    const squareFoul = `squares${foul}`;
    const newArray = [...state[squareFoul].slice(0, -1)];
    setState((prevState) => ({
      ...prevState,
      [squareFoul]: newArray,
    }));
  };

  const handleClick = (foul) => {
    const squareFoul = `squares${foul}`;
    const newArray = [
      ...state[squareFoul],
      <div className={styles.foulSquare}></div>,
    ];
    if (newArray.length === 4) {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      [squareFoul]: newArray,
    }));
  };

  return (
    <div className={styles.akaContainer}>
      <div className={styles.foulsContainer}>
        <div className={styles.foulGroup}>
          <span
            id="K"
            className={styles.foulType}
            onClick={() => handleClick("K")}
          >
            K
          </span>
          {state.squaresK.map((square, index) => (
            <div key={index} onClick={() => handleDivClick("K")}>
              {square}
            </div>
          ))}
        </div>
        <div className={styles.foulGroup}>
          <span
            id="J"
            className={styles.foulType}
            onClick={() => handleClick("J")}
          >
            J
          </span>
          {state.squaresJ.map((square, index) => (
            <div key={index} onClick={() => handleDivClick("J")}>
              {square}
            </div>
          ))}
        </div>
        <div className={styles.foulGroup}>
          <span
            id="M"
            className={styles.foulType}
            onClick={() => handleClick("M")}
          >
            M
          </span>
          {state.squaresM.map((square, index) => (
            <div key={index} onClick={() => handleDivClick("M")}>
              {square}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "-50px" }}>
        <div className={styles.pointCounterContainer}>
          <div className={styles.ippon}>
            <span>Ippon</span>
            <input
              type="number"
              placeholder="0"
              value={akaIppon}
              onChange={(e) => setAkaIppon(e.target.value)}
            />
          </div>
          <div className={styles.wazaari}>
            <span>Waza-ari</span>
            <input
              type="number"
              placeholder="0"
              value={akaWazaari}
              onChange={(e) => setAkaWazaari(e.target.value)}
            />
          </div>
        </div>
        <AkaScore akaWazaari={akaWazaari} akaIppon={akaIppon}></AkaScore>
      </div>
    </div>
  );
}
