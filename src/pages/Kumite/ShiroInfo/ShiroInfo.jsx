import styles from "./shiroinfo.module.css";
import { useEffect, useState } from "react";
import ShiroScore from "../ShiroScore/ShiroScore";

export default function ShiroInfo({
  setAkaWazaari,
  shiroWazaari,
  setShiroWazaari,
  shiroIppon,
  setShiroIppon,
  shiroSquares,
  setShiroSquares,
  shiroScore,
  setShiroScore,
  winner,
  setWinner,
}) {
  const [lostByFouls, setLostByFouls] = useState({
    lostforK: false,
    lostforJ: false,
    lostforM: false,
  });
  const isInputFocused = () => {
    return document.activeElement.tagName.toLowerCase() === "input";
  };

  const changeClass = (divID, newClass) => {
    var element = document.getElementById(divID);
    element.className = newClass;
  };

  useEffect(() => {
    if (shiroSquares.squaresK.length === 3) {
      changeClass("shirok0", `${styles.foulSquare} ${styles.lostByFoul}`);
      changeClass("shirok1", `${styles.foulSquare} ${styles.lostByFoul}`);
      changeClass("shirok2", `${styles.foulSquare} ${styles.lostByFoul}`);
    } else if (shiroSquares.squaresJ.length === 3) {
      changeClass("shiroj0", `${styles.foulSquare} ${styles.lostByFoul}`);
      changeClass("shiroj1", `${styles.foulSquare} ${styles.lostByFoul}`);
      changeClass("shiroj2", `${styles.foulSquare} ${styles.lostByFoul}`);
    } else if (shiroSquares.squaresM.length === 3) {
      changeClass("shirom0", `${styles.foulSquare} ${styles.lostByFoul}`);
      changeClass("shirom1", `${styles.foulSquare} ${styles.lostByFoul}`);
      changeClass("shirom2", `${styles.foulSquare} ${styles.lostByFoul}`);
    }
  }, [shiroSquares]);

  const handleKeyPress = (event) => {
    if (event.ctrlKey && event.key === "k" && !isInputFocused()) {
      event.preventDefault();
      const newArray = [
        ...shiroSquares.squaresK,
        <div
          id={`shiro${event.key}${shiroSquares.squaresK.length}`}
          key={`${event.key}${shiroSquares.squaresK.length}`}
          className={styles.foulSquare}
        ></div>,
      ];
      if (newArray.length === 2) {
        setAkaWazaari((prevAkaWazaari) => prevAkaWazaari + 1);
      } else if (newArray.length === 3) {
        setWinner({ ...winner, aka: true });
      } else if (newArray.length === 4) {
        return;
      }
      setShiroSquares((prevState) => ({
        ...prevState,
        squaresK: newArray,
      }));
    } else if (event.ctrlKey && event.key === "j" && !isInputFocused()) {
      event.preventDefault();
      const newArray = [
        ...shiroSquares.squaresJ,
        <div
          id={`shiro${event.key}${shiroSquares.squaresJ.length}`}
          key={`${event.key}${shiroSquares.squaresJ.length}`}
          className={styles.foulSquare}
        ></div>,
      ];
      if (newArray.length === 2) {
        setAkaWazaari((prevAkaWazaari) => prevAkaWazaari + 1);
      } else if (newArray.length === 3) {
        setWinner({ ...winner, aka: true });
      } else if (newArray.length === 4) {
        return;
      }
      setShiroSquares((prevState) => ({
        ...prevState,
        squaresJ: newArray,
      }));
    } else if (event.ctrlKey && event.key === "m" && !isInputFocused()) {
      event.preventDefault();
      const newArray = [
        ...shiroSquares.squaresM,
        <div
          id={`shiro${event.key}${shiroSquares.squaresM.length}`}
          key={`${event.key}${shiroSquares.squaresM.length}`}
          className={styles.foulSquare}
        ></div>,
      ];
      if (newArray.length === 2) {
        setAkaWazaari((prevAkaWazaari) => prevAkaWazaari + 1);
      } else if (newArray.length === 3) {
        setWinner({ ...winner, aka: true });
      } else if (newArray.length === 4) {
        return;
      }
      setShiroSquares((prevState) => ({
        ...prevState,
        squaresM: newArray,
      }));
    } else if (event.key === "i" && event.ctrlKey && !isInputFocused()) {
      setShiroIppon(shiroIppon + 1);
    } else if (event.key === "w" && event.ctrlKey && !isInputFocused()) {
      event.preventDefault();
      setShiroWazaari(shiroWazaari + 1);
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
    const newArray = [...shiroSquares[squareFoul].slice(0, -1)];
    if (newArray.length === 1) {
      setAkaWazaari((prevAkaWazaari) => prevAkaWazaari - 1);
    } else if (newArray.length <= 2) {
      setWinner({ ...winner, aka: false });
      changeClass(`shiro${foul.toLowerCase()}0`, styles.foulSquare);
      changeClass(`shiro${foul.toLowerCase()}1`, styles.foulSquare);
    }
    setShiroSquares((prevState) => ({
      ...prevState,
      [squareFoul]: newArray,
    }));
  };

  const handleClick = (foul) => {
    const squareFoul = `squares${foul}`;
    const newArray = [
      ...shiroSquares[squareFoul],
      <div
        key={`${foul}${shiroSquares[squareFoul].length}`}
        className={styles.foulSquare}
      ></div>,
    ];
    if (newArray.length === 2) {
      setAkaWazaari((prevAkaWazaari) => prevAkaWazaari + 1);
    } else if (newArray.length === 3) {
      setWinner({ ...winner, aka: true });
    } else if (newArray.length === 4) {
      return;
    }
    setShiroSquares((prevState) => ({
      ...prevState,
      [squareFoul]: newArray,
    }));
  };

  return (
    <div className={styles.shiroContainer}>
      <div className={styles.foulsContainer}>
        <div className={styles.foulGroup}>
          <span
            id="K"
            className={styles.foulType}
            onClick={() => handleClick("K")}
          >
            K
          </span>
          {shiroSquares.squaresK.map((square, index) => (
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
          {shiroSquares.squaresJ.map((square, index) => (
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
          {shiroSquares.squaresM.map((square, index) => (
            <div key={index} onClick={() => handleDivClick("M")}>
              {square}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "-50px" }}>
        <ShiroScore
          shiroWazaari={shiroWazaari}
          shiroIppon={shiroIppon}
          shiroScore={shiroScore}
          setShiroScore={setShiroScore}
          winner={winner}
          setWinner={setWinner}
        ></ShiroScore>
        <div className={styles.pointCounterContainer}>
          <div className={styles.ippon}>
            <span>Ippon</span>
            <input
              type="number"
              placeholder="0"
              value={shiroIppon}
              onChange={(e) => setShiroIppon(e.target.value)}
            />
          </div>
          <div className={styles.wazaari}>
            <span>Waza-ari</span>
            <input
              type="number"
              placeholder="0"
              value={shiroWazaari}
              onChange={(e) => setShiroWazaari(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
