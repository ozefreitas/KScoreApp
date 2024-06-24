import { useEffect } from "react";
import { isInputFocused } from "../../../utils";
import styles from "./scorecontrol.module.css";

export default function ScoreControl({
  match,
  category,
  milliseconds,
  setMilliseconds,
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  isRunning,
  setIsRunning,
  setEnded,
  setTimeLow,
  startTimer,
  matchEnded,
  akaWazaari,
  setAkaWazaari,
  akaIppon,
  setAkaIppon,
  shiroWazaari,
  setShiroWazaari,
  shiroIppon,
  setShiroIppon,
  akaSquares,
  setAkaSquares,
  shiroSquares,
  setShiroSquares,
  winner,
  setWinner,
}) {
  const changeClass = (divID, newClass) => {
    const element = document.getElementById(divID);
    element.className = newClass;
  };

  // Clock behavior
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliseconds(99);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMilliseconds(99);
        }
        if (seconds < 30 && minutes === 0) {
          setTimeLow(true);
          if (seconds === 0 && milliseconds === 0) {
            setEnded(true);
          }
        } else {
          setTimeLow(false);
          setEnded(false);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, isRunning]);

  useEffect(() => {
    if (akaSquares.squaresK.length === 3) {
      changeClass("akak0", `${styles.akaFoulSquare} ${styles.lostByFoul}`);
      changeClass("akak1", `${styles.akaFoulSquare} ${styles.lostByFoul}`);
      changeClass("akak2", `${styles.akaFoulSquare} ${styles.lostByFoul}`);
    } else if (akaSquares.squaresJ.length === 3) {
      changeClass("akaj0", `${styles.akaFoulSquare} ${styles.lostByFoul}`);
      changeClass("akaj1", `${styles.akaFoulSquare} ${styles.lostByFoul}`);
      changeClass("akaj2", `${styles.akaFoulSquare} ${styles.lostByFoul}`);
    } else if (akaSquares.squaresM.length === 3) {
      changeClass("akam0", `${styles.akaFoulSquare} ${styles.lostByFoul}`);
      changeClass("akam1", `${styles.akaFoulSquare} ${styles.lostByFoul}`);
      changeClass("akam2", `${styles.akaFoulSquare} ${styles.lostByFoul}`);
    }
    if (shiroSquares.squaresK.length === 3) {
      changeClass("shirok0", `${styles.shiroFoulSquare} ${styles.lostByFoul}`);
      changeClass("shirok1", `${styles.shiroFoulSquare} ${styles.lostByFoul}`);
      changeClass("shirok2", `${styles.shiroFoulSquare} ${styles.lostByFoul}`);
    } else if (shiroSquares.squaresJ.length === 3) {
      changeClass("shiroj0", `${styles.shiroFoulSquare} ${styles.lostByFoul}`);
      changeClass("shiroj1", `${styles.shiroFoulSquare} ${styles.lostByFoul}`);
      changeClass("shiroj2", `${styles.shiroFoulSquare} ${styles.lostByFoul}`);
    } else if (shiroSquares.squaresM.length === 3) {
      changeClass("shirom0", `${styles.shiroFoulSquare} ${styles.lostByFoul}`);
      changeClass("shirom1", `${styles.shiroFoulSquare} ${styles.lostByFoul}`);
      changeClass("shirom2", `${styles.shiroFoulSquare} ${styles.lostByFoul}`);
    }
  }, [akaSquares, shiroSquares]);

  const handleKeyPress = (event) => {
    // Clock control
    if (event.code === "Space" && !isInputFocused()) {
      if (!startTimer()) {
        return;
      } else setIsRunning(!isRunning);
    } else if (event.key === "ArrowUp" && !isInputFocused()) {
      setIsRunning(false);
      setSeconds((prevSconds) => prevSconds + 1);
      setMilliseconds(0);
      if (seconds === 59) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        setSeconds(0);
      }
    } else if (event.key === "ArrowDown" && !isInputFocused()) {
      setIsRunning(false);
      setSeconds((prevSconds) => prevSconds - 1);
      setMilliseconds(0);
      if (minutes === 0 && seconds <= 0) {
        setSeconds(0);
      } else if (seconds === 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      }
    } else if (
      event.key === "Backspace" &&
      event.ctrlKey &&
      !isInputFocused()
    ) {
      setMilliseconds(0);
      setSeconds(0);
      setMinutes(0);
      setIsRunning(false);
      setTimeLow(false);
      setEnded(false);
      setWinner({ aka: false, shiro: false });
      setAkaIppon(0);
      setAkaWazaari(0);
      setAkaSquares({
        squaresK: [],
        squaresJ: [],
        squaresM: [],
      });
      setShiroIppon(0);
      setShiroWazaari(0);
      setShiroSquares({
        squaresK: [],
        squaresJ: [],
        squaresM: [],
      });
    } else if (event.code === "KeyR" && !isInputFocused()) {
      if (category.includes("Juvenil") || category.includes("Veterano")) {
        setMinutes(1);
        setSeconds(30);
      } else {
        setMinutes(2);
        setSeconds(0);
      }
      setMilliseconds(0);
      setIsRunning(false);
      setTimeLow(false);
      setEnded(false);
    } else if (event.code === "KeyT" && !isInputFocused()) {
      setMilliseconds(0);
      setSeconds(30);
      setMinutes(1);
      setIsRunning(false);
      setTimeLow(false);
      setEnded(false);
    } else if (
      match === "teamkumite" &&
      event.key === "Enter" &&
      event.ctrlKey &&
      !isInputFocused()
    ) {
      matchEnded();
      if (category.includes("Juvenil") || category.includes("Veterano")) {
        setMinutes(1);
        setSeconds(30);
      } else {
        setMinutes(2);
        setSeconds(0);
      }
      setMilliseconds(0);
      setIsRunning(false);
      setTimeLow(false);
      setEnded(false);
      setWinner({ aka: false, shiro: false });
      setAkaIppon(0);
      setAkaWazaari(0);
      setAkaSquares({
        squaresK: [],
        squaresJ: [],
        squaresM: [],
      });
      setShiroIppon(0);
      setShiroWazaari(0);
      setShiroSquares({
        squaresK: [],
        squaresJ: [],
        squaresM: [],
      });
    }

    // Aka fouls control
    if (event.code === "KeyK" && !event.ctrlKey && !isInputFocused()) {
      const newArray = [
        ...akaSquares.squaresK,
        <div
          id={`aka${event.key}${akaSquares.squaresK.length}`}
          key={`${event.key}${akaSquares.squaresK.length}`}
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
        squaresK: newArray,
      }));
    } else if (event.code === "KeyJ" && !event.ctrlKey && !isInputFocused()) {
      const newArray = [
        ...akaSquares.squaresJ,
        <div
          id={`aka${event.key}${akaSquares.squaresJ.length}`}
          key={`${event.key}${akaSquares.squaresJ.length}`}
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
        squaresJ: newArray,
      }));
    } else if (event.code === "KeyM" && !event.ctrlKey && !isInputFocused()) {
      const newArray = [
        ...akaSquares.squaresM,
        <div
          id={`aka${event.key}${akaSquares.squaresM.length}`}
          key={`${event.key}${akaSquares.squaresM.length}`}
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
        squaresM: newArray,
      }));

      // Aka points control
    } else if (event.code === "KeyI" && !event.ctrlKey && !isInputFocused()) {
      setAkaIppon(akaIppon + 1);
    } else if (event.code === "KeyW" && !event.ctrlKey && !isInputFocused()) {
      setAkaWazaari(akaWazaari + 1);
    }

    // Shiro fouls control
    if (event.ctrlKey && event.code === "KeyK" && !isInputFocused()) {
      event.preventDefault();
      const newArray = [
        ...shiroSquares.squaresK,
        <div
          id={`shiro${event.key}${shiroSquares.squaresK.length}`}
          key={`${event.key}${shiroSquares.squaresK.length}`}
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
        squaresK: newArray,
      }));
    } else if (event.ctrlKey && event.code === "KeyJ" && !isInputFocused()) {
      event.preventDefault();
      const newArray = [
        ...shiroSquares.squaresJ,
        <div
          id={`shiro${event.key}${shiroSquares.squaresJ.length}`}
          key={`${event.key}${shiroSquares.squaresJ.length}`}
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
        squaresJ: newArray,
      }));
    } else if (event.ctrlKey && event.code === "KeyM" && !isInputFocused()) {
      event.preventDefault();
      const newArray = [
        ...shiroSquares.squaresM,
        <div
          id={`shiro${event.key}${shiroSquares.squaresM.length}`}
          key={`${event.key}${shiroSquares.squaresM.length}`}
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
        squaresM: newArray,
      }));

      // Shiro points control
    } else if (event.code === "KeyI" && event.ctrlKey && !isInputFocused()) {
      setShiroIppon(shiroIppon + 1);
    } else if (event.code === "KeyW" && event.ctrlKey && !isInputFocused()) {
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

  return;
}
