import { useState, useEffect } from "react";
import styles from "./time.module.css";

export default function Time() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(null);
  const [timeLow, setTimeLow] = useState(false);

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
        if (seconds < 15 && minutes === 0) {
          setTimeLow(true);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, isRunning]);

  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      startTimer();
      setIsRunning(!isRunning);
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
    } else {
      window.alert("METE TEMPO NESSA MERTDA");
    }
  };

  const changeMinutes = (e) => {
    setMinutes(e.target.value);
  };
  const changeSeconds = (e) => {
    setSeconds(e.target.value);
  };
  const changeMilliseconds = (e) => {
    setMilliseconds(e.target.value);
  };

  return (
    <div className={styles.timeContainer}>
      <span>
        <input type="number" value={minutes} onChange={changeMinutes}></input>:
        <input type="number" value={seconds} onChange={changeSeconds}></input>:
        <input
          type="number"
          value={milliseconds}
          onChange={changeMilliseconds}
        ></input>
      </span>
    </div>
  );
}
