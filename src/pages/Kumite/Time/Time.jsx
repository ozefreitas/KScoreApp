import { useState, useEffect } from "react";
import styles from "./time.module.css";
import ScoreControl from "../ScoreControl/ScoreControl";
import "../../../variables.css";

export default function Time({
  match,
  category,
  setShowNotification,
  setNotificationTitle,
  setNotificationBody,
  akaScore,
  shiroScore,
  winner,
  setWinner,
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
    matchWinner: {
      match1: false,
      match2: false,
      match3: false,
      match4: false,
      match5: false,
    },
    matchBlinking: {
      match1: false,
      match2: false,
      match3: false,
      match4: false,
      match5: false,
    },
  });
  const [teamMatchEnded, setTeamMatchEnded] = useState({
    aka: false,
    shiro: false,
  });
  const sound = document.getElementById("gong");

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

  // check for winner team
  useEffect(() => {
    const newCounts = { aka: 0, shiro: 0, tie: 0 };

    Object.values(winnerTeam.matchWinner).forEach((winner) => {
      if (winner === "aka") newCounts.aka += 1;
      else if (winner === "shiro") newCounts.shiro += 1;
      else if (winner === "tie") newCounts.tie += 1;
    });
    if (newCounts.tie <= 1) {
      if (newCounts.aka === 2 && !teamMatchEnded.aka) {
        const updatedWinnerTeam = { ...winnerTeam.matchWinner };
        for (let match in updatedWinnerTeam) {
          if (updatedWinnerTeam[match] === "aka") {
            updatedWinnerTeam[match] = true;
          }
          setWinnerTeam((prevWinnerTeam) => ({
            ...prevWinnerTeam,
            matchBlinking: updatedWinnerTeam,
          }));
        }
        setTeamMatchEnded((prevTeamMatchEnded) => ({
          ...prevTeamMatchEnded,
          aka: true,
        }));
      } else if (newCounts.aka !== 2 && teamMatchEnded.aka) {
        setWinner({ aka: false, shiro: false });
        setWinnerTeam((prevWinnerTeam) => ({
          ...prevWinnerTeam,
          matchBlinking: {
            match1: false,
            match2: false,
            match3: false,
            match4: false,
            match5: false,
          },
        }));
        setTeamMatchEnded((prevTeamMatchEnded) => ({
          ...prevTeamMatchEnded,
          aka: false,
        }));
      } else if (newCounts.shiro === 2 && !teamMatchEnded.shiro) {
        const updatedWinnerTeam = { ...winnerTeam.matchWinner };
        for (let match in updatedWinnerTeam) {
          if (updatedWinnerTeam[match] === "shiro") {
            updatedWinnerTeam[match] = true;
          }
          setWinnerTeam((prevWinnerTeam) => ({
            ...prevWinnerTeam,
            matchBlinking: updatedWinnerTeam,
          }));
        }
        setTeamMatchEnded((prevTeamMatchEnded) => ({
          ...prevTeamMatchEnded,
          shiro: true,
        }));
      } else if (newCounts.shiro !== 2 && teamMatchEnded.shiro) {
        setWinner({ aka: false, shiro: false });
        setWinnerTeam((prevWinnerTeam) => ({
          ...prevWinnerTeam,
          matchBlinking: {
            match1: false,
            match2: false,
            match3: false,
            match4: false,
            match5: false,
          },
        }));
        setTeamMatchEnded((prevTeamMatchEnded) => ({
          ...prevTeamMatchEnded,
          shiro: false,
        }));
      }
    } else {
      if (newCounts.aka === 1 && !teamMatchEnded.aka) {
        const updatedWinnerTeam = { ...winnerTeam.matchWinner };
        for (let match in updatedWinnerTeam) {
          if (updatedWinnerTeam[match] === "aka") {
            updatedWinnerTeam[match] = true;
          }
          setWinnerTeam((prevWinnerTeam) => ({
            ...prevWinnerTeam,
            matchBlinking: updatedWinnerTeam,
          }));
        }
        setTeamMatchEnded((prevTeamMatchEnded) => ({
          ...prevTeamMatchEnded,
          aka: true,
        }));
      } else if (newCounts.aka === 0 && teamMatchEnded.aka) {
        setWinner({ aka: false, shiro: false });
        setWinnerTeam((prevWinnerTeam) => ({
          ...prevWinnerTeam,
          matchBlinking: {
            match1: false,
            match2: false,
            match3: false,
            match4: false,
            match5: false,
          },
        }));
        setTeamMatchEnded((prevTeamMatchEnded) => ({
          ...prevTeamMatchEnded,
          aka: false,
        }));
      } else if (newCounts.shiro === 1 && !teamMatchEnded.shiro) {
        const updatedWinnerTeam = { ...winnerTeam.matchWinner };
        for (let match in updatedWinnerTeam) {
          if (updatedWinnerTeam[match] === "shiro") {
            updatedWinnerTeam[match] = true;
          }
          setWinnerTeam((prevWinnerTeam) => ({
            ...prevWinnerTeam,
            matchBlinking: updatedWinnerTeam,
          }));
        }
        setTeamMatchEnded((prevTeamMatchEnded) => ({
          ...prevTeamMatchEnded,
          shiro: true,
        }));
      } else if (newCounts.shiro === 0 && teamMatchEnded.shiro) {
        setWinner({ aka: false, shiro: false });
        setWinnerTeam((prevWinnerTeam) => ({
          ...prevWinnerTeam,
          matchBlinking: {
            match1: false,
            match2: false,
            match3: false,
            match4: false,
            match5: false,
          },
        }));
        setTeamMatchEnded((prevTeamMatchEnded) => ({
          ...prevTeamMatchEnded,
          shiro: false,
        }));
      }
    }
  }, [winnerTeam, teamMatchEnded]);

  // if a team won, her card blinks also
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

  // sets the results of the matchs in Team Kumite
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
          setWinnerTeam((prevWinnerTeam) => ({
            ...prevWinnerTeam,
            matchWinner: { ...prevWinnerTeam.matchWinner, [key]: "aka" },
          }));
        } else if (akaScore < shiroScore) {
          setMatchClick({
            ...matchClick,
            [key]: {
              ...matchClick[key],
              backgroundColor: "white",
            },
          });
          setWinnerTeam((prevWinnerTeam) => ({
            ...prevWinnerTeam,
            matchWinner: { ...prevWinnerTeam.matchWinner, [key]: "shiro" },
          }));
        } else {
          setMatchClick({
            ...matchClick,
            [key]: {
              ...matchClick[key],
              backgroundColor: "yellow",
            },
          });
          setWinnerTeam((prevWinnerTeam) => ({
            ...prevWinnerTeam,
            matchWinner: { ...prevWinnerTeam.matchWinner, [key]: "tie" },
          }));
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
    setWinnerTeam((prevWinnerTeam) => ({
      ...prevWinnerTeam,
      matchWinner: { ...prevWinnerTeam.matchWinner, [matchNumber]: false },
    }));
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
                winnerTeam.matchBlinking.match1 === true ? "blinking" : ""
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
                winnerTeam.matchBlinking.match2 === true ? "blinking" : ""
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
                winnerTeam.matchBlinking.match3 === true ? "blinking" : ""
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
                winnerTeam.matchBlinking.match4 === true ? "blinking" : ""
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
                winnerTeam.matchBlinking.match5 === true ? "blinking" : ""
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
      <ScoreControl
        match={match}
        category={category}
        milliseconds={milliseconds}
        setMilliseconds={setMilliseconds}
        seconds={seconds}
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setEnded={setEnded}
        setTimeLow={setTimeLow}
        akaWazaari={akaWazaari}
        setAkaWazaari={setAkaWazaari}
        akaIppon={akaIppon}
        setAkaIppon={setAkaIppon}
        akaSquares={akaSquares}
        setAkaSquares={setAkaSquares}
        shiroWazaari={shiroWazaari}
        setShiroWazaari={setShiroWazaari}
        shiroIppon={shiroIppon}
        setShiroIppon={setShiroIppon}
        shiroSquares={shiroSquares}
        setShiroSquares={setShiroSquares}
        startTimer={startTimer}
        matchEnded={matchEnded}
        winner={winner}
        setWinner={setWinner}
      ></ScoreControl>
    </div>
  );
}
