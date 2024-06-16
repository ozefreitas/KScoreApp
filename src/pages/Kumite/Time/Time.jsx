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
    match1: { backgroundColor: "" },
    match2: { backgroundColor: "" },
    match3: { backgroundColor: "" },
    match4: { backgroundColor: "" },
    match5: { backgroundColor: "" },
  });
  const [winnerTeam, setWinnerTeam] = useState({
    match1: false,
    match2: false,
    match3: false,
    match4: false,
    match5: false,
  });
  const [teamMatchEnded, setTeamMatchEnded] = useState({
    aka: false,
    shiro: false,
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

  useEffect(() => {
    const newCounts = { aka: 0, shiro: 0, tie: 0 };

    Object.values(winnerTeam).forEach((winner) => {
      if (winner === "aka") newCounts.aka += 1;
      else if (winner === "shiro") newCounts.shiro += 1;
      else if (winner === "tie") newCounts.tie += 1;
    });
    if (newCounts.tie <= 1) {
      if (newCounts.aka === 2) {
        const updatedWinnerTeam = { ...winnerTeam };
        for (let match in updatedWinnerTeam) {
          if (updatedWinnerTeam[match] === "aka") {
            updatedWinnerTeam[match] = true;
          }
          setWinnerTeam(updatedWinnerTeam);
        }
        setTeamMatchEnded({ ...teamMatchEnded, aka: true });
      } else if (newCounts.shiro === 2) {
        const updatedWinnerTeam = { ...winnerTeam };
        for (let match in updatedWinnerTeam) {
          if (updatedWinnerTeam[match] === "shiro") {
            updatedWinnerTeam[match] = true;
          }
          setWinnerTeam(updatedWinnerTeam);
        }
        setTeamMatchEnded({ ...teamMatchEnded, shiro: true });
      }
    } else {
      if (newCounts.aka === 1) {
        const updatedWinnerTeam = { ...winnerTeam };
        for (let match in updatedWinnerTeam) {
          if (updatedWinnerTeam[match] === "aka") {
            updatedWinnerTeam[match] = true;
          }
          setWinnerTeam(updatedWinnerTeam);
        }
        setTeamMatchEnded({ ...teamMatchEnded, aka: true });
      } else if (newCounts.shiro === 1) {
        const updatedWinnerTeam = { ...winnerTeam };
        for (let match in updatedWinnerTeam) {
          if (updatedWinnerTeam[match] === "shiro") {
            updatedWinnerTeam[match] = true;
          }
          setWinnerTeam(updatedWinnerTeam);
        }
        setTeamMatchEnded({ ...teamMatchEnded, shiro: true });
      }
    }
  }, [winnerTeam, teamMatchEnded]);

  useEffect(() => {
    if (teamMatchEnded.aka) {
      setWinner({ ...winner, aka: true });
    } else if (teamMatchEnded.shiro) {
      setWinner({ ...winner, shiro: true });
    }
  }, [teamMatchEnded]);

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
      setTeamMatchEnded(false);
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
    } else if (event.key === "Enter" && event.ctrlKey && !isInputFocused()) {
      matchEnded();
      setMilliseconds(0);
      setSeconds(0);
      setMinutes(0);
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

  const matchEnded = () => {
    for (let key of Object.keys(matchClick)) {
      if (matchClick[key].backgroundColor === "") {
        if (akaScore > shiroScore) {
          setMatchClick({
            ...matchClick,
            [key]: {
              ...matchClick[key],
              backgroundColor: "#bf0303",
            },
          });
          setWinnerTeam({ ...winnerTeam, [key]: "aka" });
        } else if (akaScore < shiroScore) {
          setMatchClick({
            ...matchClick,
            [key]: {
              ...matchClick[key],
              backgroundColor: "white",
            },
          });
          setWinnerTeam({ ...winnerTeam, [key]: "shiro" });
        } else {
          setMatchClick({
            ...matchClick,
            [key]: {
              ...matchClick[key],
              backgroundColor: "yellow",
            },
          });
          setWinnerTeam({ ...winnerTeam, [key]: "tie" });
        }
        document.getElementById(key).innerText = `${akaScore} - ${shiroScore}`;
        break;
      } else {
        continue;
      }
    }
  };

  const handleDivClick = (e) => {
    const matchNumber = e.target.id;
    setMatchClick({
      ...matchClick,
      [matchNumber]: { ...matchClick[matchNumber], backgroundColor: "" },
    });
    setWinnerTeam({ ...winnerTeam, [matchNumber]: false });
    document.getElementById(matchNumber).innerText = "";
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
          <div className={styles.matchesResults}>
            <div
              id="match1"
              className={`${styles.wonMatches} ${
                winnerTeam.match1 === true ? styles.blinking : ""
              } ${
                matchClick.match1.backgroundColor === "white" ||
                matchClick.match1.backgroundColor === "yellow"
                  ? styles.white
                  : ""
              }`}
              style={matchClick.match1}
              onClick={handleDivClick}
            ></div>
            <div
              id="match2"
              className={`${styles.wonMatches} ${
                winnerTeam.match2 === true ? styles.blinking : ""
              } ${
                matchClick.match2.backgroundColor === "white" ||
                matchClick.match2.backgroundColor === "yellow"
                  ? styles.white
                  : ""
              }`}
              style={matchClick.match2}
              onClick={handleDivClick}
            ></div>
            <div
              id="match3"
              className={`${styles.wonMatches} ${
                winnerTeam.match3 === true ? styles.blinking : ""
              } ${
                matchClick.match3.backgroundColor === "white" ||
                matchClick.match3.backgroundColor === "yellow"
                  ? styles.white
                  : ""
              }`}
              style={matchClick.match3}
              onClick={handleDivClick}
            ></div>
            <div
              id="match4"
              className={`${styles.wonMatches} ${
                winnerTeam.match4 === true ? styles.blinking : ""
              } ${
                matchClick.match4.backgroundColor === "white" ||
                matchClick.match4.backgroundColor === "yellow"
                  ? styles.white
                  : ""
              }`}
              style={matchClick.match4}
              onClick={handleDivClick}
            ></div>
            <div
              id="match5"
              className={`${styles.wonMatches} ${
                winnerTeam.match5 === true ? styles.blinking : ""
              } ${
                matchClick.match5.backgroundColor === "white" ||
                matchClick.match5.backgroundColor === "yellow"
                  ? styles.white
                  : ""
              }`}
              style={matchClick.match5}
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
