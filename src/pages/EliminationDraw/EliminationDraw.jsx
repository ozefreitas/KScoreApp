import { useEffect, useState } from "react";
import styles from "./eliminationdraw.module.css";
import { shuffleArray } from "../../utils";

export default function EliminationDraw({
  compList,
  category,
  runDraw,
  setRunDraw,
  deleteDraw,
  setDeleteDraw,
}) {
  const [allMatches, setAllMatches] = useState([]);
  const [playersInFinals, setPlayersInFinals] = useState(8);
  const [matchType, setMatchType] = useState("Kata");
  const ipcRenderer = window.ipcRenderer;
  let keys = Object.keys(compList);
  let filtered = keys.filter((key) => {
    return compList[key];
  });

  const createSingleMatch = (array, byes) => {
    const singleMatch = [];
    for (let i = 0; i < byes; i++) {
      const player1 = array.shift();
      const pair = [player1, "bye"];
      if (Math.random() > 0.5) {
        [pair[0], pair[1]] = [pair[1], pair[0]];
      }
      singleMatch.push(pair);
    }
    while (array.length >= 2) {
      const player1 = array.shift();
      const player2 = array.shift();
      const pair = [player1, player2];
      if (Math.random() > 0.5) {
        [pair[0], pair[1]] = [pair[1], pair[0]];
      }
      singleMatch.push(pair);
    }
    return singleMatch;
  };

  const createMatches = () => {
    const shuffledPlayers = shuffleArray(filtered.slice());
    const matches = [];
    if (shuffledPlayers.length === 2) {
      const matches = createSingleMatch(shuffledPlayers, 0);
      return matches;
    } else if (shuffledPlayers.length > 2 && shuffledPlayers.length <= 4) {
      const byeNumber = 4 - shuffledPlayers.length;
      const matches = createSingleMatch(shuffledPlayers, byeNumber);
      return matches;
    } else if (shuffledPlayers.length > 4 && shuffledPlayers.length <= 8) {
      const byeNumber = 8 - shuffledPlayers.length;
      const matches = createSingleMatch(shuffledPlayers, byeNumber);
      return matches;
    } else if (shuffledPlayers.length > 8 && shuffledPlayers.length <= 16) {
      const byeNumber = 16 - shuffledPlayers.length;
      const matches = createSingleMatch(shuffledPlayers, byeNumber);
      return matches;
    } else if (shuffledPlayers.length > 16 && shuffledPlayers.length <= 32) {
      const byeNumber = 32 - shuffledPlayers.length;
      const matches = createSingleMatch(shuffledPlayers, byeNumber);
      return matches;
    } else if (shuffledPlayers.length > 32 && shuffledPlayers.length <= 64) {
      const byeNumber = 64 - shuffledPlayers.length;
      const matches = createSingleMatch(shuffledPlayers, byeNumber);
      return matches;
    }
    return matches;
  };

  useEffect(() => {
    if (runDraw) {
      if (filtered.length >= playersInFinals) {
        setAllMatches(shuffleArray(createMatches()));
        setRunDraw(false);
      }
    }
    if (deleteDraw) {
      setAllMatches([]);
      setDeleteDraw(false);
    }
  }, [
    setAllMatches,
    runDraw,
    setRunDraw,
    deleteDraw,
    setDeleteDraw,
    playersInFinals,
    filtered,
  ]);

  function triggerExcelGenerationWithData(data, file) {
    ipcRenderer.send("generate-excel", data, file);
  }

  const handleClick = () => {
    const data = [];
    data.splice(0, 0, ["", "", ""]);
    data.splice(0, 0, ["Cinto", "Nome", "Dorsal"]);
    if (filtered.length <= playersInFinals && matchType === "Kata") {
      for (let i = 0; i < filtered.length; i++) {
        let cinto;
        if (i % 2 === 0) {
          cinto = "Aka";
        } else {
          cinto = "Shiro";
        }
        data.push([
          cinto,
          filtered[i].split("|")[0],
          filtered[i].split("|")[1],
        ]);
      }
    } else {
      for (let indivMatch of allMatches) {
        const byeIndex = indivMatch.indexOf("bye");
        if (byeIndex === 0) {
          data.push(
            ["Aka", "bye", ""],
            ["", "vs", ""],
            ["Shiro", indivMatch[1].split("|")[0], indivMatch[1].split("|")[1]]
          );
        } else if (byeIndex === 1) {
          data.push(
            ["Aka", indivMatch[0].split("|")[0], indivMatch[0].split("|")[1]],
            ["", "vs", ""],
            ["Shiro", "bye", ""]
          );
        } else {
          data.push(
            ["Aka", indivMatch[0].split("|")[0], indivMatch[0].split("|")[1]],
            ["", "vs", ""],
            ["Shiro", indivMatch[1].split("|")[0], indivMatch[1].split("|")[1]]
          );
        }
        data.push(["", "", ""]);
      }
    }
    const drawFile = `${category.split(" ").join("_")}_Partidas.xlsx`;
    triggerExcelGenerationWithData(data, drawFile);
  };

  return (
    <div className={styles.matchesDiv}>
      {allMatches.length !== 0 ? (
        <button
          title="Mudar entre Kata e Kumite"
          className={styles.matchTypeButton}
          onClick={() =>
            setMatchType((prevType) =>
              prevType === "Kata" ? "Kumite" : "Kata"
            )
          }
        >
          Categoria: <strong>{matchType}</strong>
        </button>
      ) : (
        ""
      )}
      {allMatches.length !== 0 && matchType === "Kata" ? (
        <button
          title="Se o número de atletas for inferior ao número admitido para final, irá apenas sortear a ordem dos mesmos"
          className={styles.finalButton}
          onClick={() =>
            setPlayersInFinals((prevNumber) => (prevNumber === 8 ? 4 : 8))
          }
        >
          Final de <strong>{playersInFinals}</strong>
        </button>
      ) : (
        ""
      )}
      {filtered.length > playersInFinals || matchType === "Kumite"
        ? allMatches.map((match, index) => (
            <div key={index} className={styles.eachMatch}>
              {match[0].split("|")[0]} {match[0].split("|")[1]} vs{" "}
              {match[1].split("|")[0]} {match[1].split("|")[1]}
            </div>
          ))
        : shuffleArray(filtered).map((comp, index) => (
            <div key={index} className={styles.eachMatch}>
              {comp.split("|")[0]} {comp.split("|")[1]}
            </div>
          ))}
      {allMatches.length !== 0 ? (
        <button className={styles.downloadButton} onClick={handleClick}>
          Descarregar
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
