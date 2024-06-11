import { useState, useEffect } from "react";
import styles from "./time.module.css";

export default function Time({
  match,
  setShowNotification,
  setNotificationTitle,
  setNotificationBody,
  akaScore,
  shiroScore,
  winner,
  setWinner,
}) {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(null);
  const [timeLow, setTimeLow] = useState(false);
  const [ended, setEnded] = useState(false);
  const [matchClick, setMatchClick] = useState({
    aka1: { backgroundColor: "" },
    aka2: { backgroundColor: "" },
    aka3: { backgroundColor: "" },
    shiro1: { backgroundColor: "" },
    shiro2: { backgroundColor: "" },
    shiro3: { backgroundColor: "" },
  });
  const sound = document.getElementById("gong");

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
    if (timeLow) {
      sound.play();
    }
    if (ended) {
      sound.play();
      setTimeout(() => {
        sound.currentTime = 0;
        sound.play();
      }, 250);
      if (akaScore > shiroScore) {
        setWinner({ ...winner, aka: true });
      } else if (akaScore < shiroScore) {
        setWinner({ ...winner, shiro: true });
      } else {
        setWinner({ aka: true, shiro: true });
      }
    }
  }, [timeLow, ended]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const isInputFocused = () => {
    return document.activeElement.tagName.toLowerCase() === "input";
  };

  const handleKeyPress = (event) => {
    if (event.code === "Space" && !isInputFocused()) {
      if (!startTimer()) {
        return;
      } else setIsRunning(!isRunning);
    } else if (event.code === "ArrowUp" && !isInputFocused()) {
      setIsRunning(false);
      setSeconds((prevSconds) => prevSconds + 1);
      setMilliseconds(0);
      if (seconds === 59) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        setSeconds(0);
      }
    } else if (event.code === "ArrowDown" && !isInputFocused()) {
      setIsRunning(false);
      setSeconds((prevSconds) => prevSconds - 1);
      setMilliseconds(0);
      if (minutes === 0 && seconds <= 0) {
        setSeconds(0);
      } else if (seconds === 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      }
    } else if (event.key === "Backspace" && event.ctrlKey) {
      setMilliseconds(0);
      setSeconds(0);
      setMinutes(0);
      setIsRunning(false);
      setTimeLow(false);
      setEnded(false);
    } else if (event.key === "r" && !isInputFocused()) {
      setMilliseconds(0);
      setSeconds(0);
      setMinutes(2);
      setIsRunning(false);
      setTimeLow(false);
      setEnded(false);
    } else if (event.key === "t" && !isInputFocused()) {
      setMilliseconds(0);
      setSeconds(30);
      setMinutes(1);
      setIsRunning(false);
      setTimeLow(false);
      setEnded(false);
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

  const startTimer = () => {
    if (minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      setIsRunning(true);
      return true;
    } else {
      setShowNotification(true);
      setNotificationTitle("Erro");
      setNotificationBody("Defenir Temporizador");
      return false;
    }
  };

  const handleDivClick = (e) => {
    const matchNumber = e.target.id;
    if (matchClick[matchNumber].backgroundColor === "") {
      if (matchNumber.includes("aka")) {
        setMatchClick({
          ...matchClick,
          [matchNumber]: {
            ...matchClick[matchNumber],
            backgroundColor: "#bf0303",
          },
        });
      } else {
        setMatchClick({
          ...matchClick,
          [matchNumber]: {
            ...matchClick[matchNumber],
            backgroundColor: "white",
          },
        });
      }
    } else {
      setMatchClick({
        ...matchClick,
        [matchNumber]: { ...matchClick[matchNumber], backgroundColor: "" },
      });
    }
  };

  const changeMinutes = (e) => {
    setIsRunning(false);
    setMinutes(e.target.value);
  };
  const changeSeconds = (e) => {
    setIsRunning(false);
    setSeconds(e.target.value);
  };
  const changeMilliseconds = (e) => {
    setIsRunning(false);
    setMilliseconds(e.target.value);
  };

  return (
    <div className={styles.middleContainer}>
      <audio
        id="gong"
        src={
          process.env.PUBLIC_URL + "/131470-Gong-Small-Stereo-Fienup-004.wav"
        }
      ></audio>
      <div
        id="timer"
        className={`${styles.timeContainer} ${
          timeLow ? styles.lastSeconds : ""
        } ${ended ? styles.timerEnded : ""}`}
      >
        <span>
          <input
            type="number"
            value={minutes}
            className={styles.minutesInput}
            onChange={changeMinutes}
          ></input>
          :
          <input
            type="number"
            value={formatTime(seconds)}
            onChange={changeSeconds}
          ></input>
          <input
            type="number"
            value={formatTime(milliseconds)}
            className={styles.millisecondsInput}
            onChange={changeMilliseconds}
          ></input>
        </span>
      </div>
      {match !== "kumite" ? (
        <div className={styles.matches}>
          <div className={styles.akaMatches}>
            <div
              id="aka1"
              className={styles.wonMatches}
              style={matchClick.aka1}
              onClick={handleDivClick}
            ></div>
            <div
              id="aka2"
              className={styles.wonMatches}
              style={matchClick.aka2}
              onClick={handleDivClick}
            ></div>
            <div
              id="aka3"
              className={styles.wonMatches}
              style={matchClick.aka3}
              onClick={handleDivClick}
            ></div>
          </div>
          <div className={styles.shiroMatches}>
            <div
              id="shiro1"
              className={styles.wonMatches}
              style={matchClick.shiro1}
              onClick={handleDivClick}
            ></div>
            <div
              id="shiro2"
              className={styles.wonMatches}
              style={matchClick.shiro2}
              onClick={handleDivClick}
            ></div>
            <div
              id="shiro3"
              className={styles.wonMatches}
              style={matchClick.shiro3}
              onClick={handleDivClick}
            ></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
