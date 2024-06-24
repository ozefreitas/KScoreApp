import styles from "./shiroinfo.module.css";
import { useEffect, useState } from "react";
import ShiroScore from "../ShiroScore/ShiroScore";

export default function ShiroInfo({
  category,
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
  const changeClass = (divID, newClass) => {
    var element = document.getElementById(divID);
    element.className = newClass;
  };

  const handleDivClick = (foul) => {
    const squareFoul = `squares${foul}`;
    const newArray = [...shiroSquares[squareFoul].slice(0, -1)];
    if (newArray.length === 1) {
      setAkaWazaari((prevAkaWazaari) => prevAkaWazaari - 1);
    } else if (newArray.length === 2) {
      setWinner({ ...winner, aka: false });
      changeClass(`shiro${foul.toLowerCase()}0`, styles.shiroFoulSquare);
      changeClass(`shiro${foul.toLowerCase()}1`, styles.shiroFoulSquare);
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
        id={`shiro${foul.toLowerCase()}${shiroSquares[squareFoul].length}`}
        key={`${foul}${shiroSquares[squareFoul].length}`}
        className={styles.shiroFoulSquare}
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
          category={category}
          shiroWazaari={shiroWazaari}
          shiroIppon={shiroIppon}
          shiroScore={shiroScore}
          setShiroScore={setShiroScore}
          winner={winner}
          setWinner={setWinner}
        ></ShiroScore>
        <div className={styles.pointCounterContainer}>
          <div className={styles.ippon}>
            <span
              onClick={() =>
                setShiroIppon((prevNumber) =>
                  prevNumber > 0 ? prevNumber - 1 : prevNumber
                )
              }
            >
              Ippon
            </span>
            <input
              type="number"
              placeholder="0"
              value={shiroIppon}
              onChange={(e) => setShiroIppon(e.target.value)}
            />
          </div>
          <div className={styles.wazaari}>
            <span
              onClick={() =>
                setShiroWazaari((prevNumber) =>
                  prevNumber > 0 ? prevNumber - 1 : prevNumber
                )
              }
            >
              Waza-ari
            </span>
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
