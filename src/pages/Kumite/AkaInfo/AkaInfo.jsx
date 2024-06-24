import { useEffect } from "react";
import styles from "./akainfo.module.css";
import AkaScore from "../AkaScore/AkaScore";

export default function AkaInfo({
  category,
  akaWazaari,
  setAkaWazaari,
  akaIppon,
  setAkaIppon,
  setShiroWazaari,
  akaSquares,
  setAkaSquares,
  akaScore,
  setAkaScore,
  winner,
  setWinner,
}) {
  const changeClass = (divID, newClass) => {
    const element = document.getElementById(divID);
    element.className = newClass;
  };

  const handleDivClick = (foul) => {
    const squareFoul = `squares${foul}`;
    const newArray = [...akaSquares[squareFoul].slice(0, -1)];
    if (newArray.length === 1) {
      setShiroWazaari((prevShiroWazaari) => prevShiroWazaari - 1);
    } else if (newArray.length === 2) {
      setWinner({ ...winner, shiro: false });
      changeClass(`aka${foul.toLowerCase()}0`, styles.akaFoulSquare);
      changeClass(`aka${foul.toLowerCase()}1`, styles.akaFoulSquare);
    }
    setAkaSquares((prevState) => ({
      ...prevState,
      [squareFoul]: newArray,
    }));
  };

  const handleClick = (foul) => {
    const squareFoul = `squares${foul}`;
    const newArray = [
      ...akaSquares[squareFoul],
      <div
        id={`aka${foul.toLowerCase()}${akaSquares[squareFoul].length}`}
        key={`${foul}${akaSquares[squareFoul].length}`}
        className={styles.akaFoulSquare}
      ></div>,
    ];
    if (newArray.length === 2) {
      setShiroWazaari((prevShiroWazaari) => prevShiroWazaari + 1);
    } else if (newArray.length === 3) {
      setWinner({ ...winner, shiro: true });
    } else if (newArray.length === 4) {
      return;
    }
    setAkaSquares((prevState) => ({
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
          {akaSquares.squaresK.map((square, index) => (
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
          {akaSquares.squaresJ.map((square, index) => (
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
          {akaSquares.squaresM.map((square, index) => (
            <div key={index} onClick={() => handleDivClick("M")}>
              {square}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "-50px" }}>
        <div className={styles.pointCounterContainer}>
          <div className={styles.ippon}>
            <span
              onClick={() =>
                setAkaIppon((prevNumber) =>
                  prevNumber > 0 ? prevNumber - 1 : prevNumber
                )
              }
            >
              Ippon
            </span>
            <input
              type="number"
              placeholder="0"
              value={akaIppon}
              onChange={(e) => setAkaIppon(e.target.value)}
            />
          </div>
          <div className={styles.wazaari}>
            <span
              onClick={() =>
                setAkaWazaari((prevNumber) =>
                  prevNumber > 0 ? prevNumber - 1 : prevNumber
                )
              }
            >
              Waza-ari
            </span>
            <input
              type="number"
              placeholder="0"
              value={akaWazaari}
              onChange={(e) => setAkaWazaari(e.target.value)}
            />
          </div>
        </div>
        <AkaScore
          category={category}
          akaWazaari={akaWazaari}
          akaIppon={akaIppon}
          akaScore={akaScore}
          setAkaScore={setAkaScore}
          winner={winner}
          setWinner={setWinner}
        ></AkaScore>
      </div>
    </div>
  );
}
