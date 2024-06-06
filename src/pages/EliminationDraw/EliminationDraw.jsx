import { useEffect, useState } from "react";
import styles from "./eliminationdraw.module.css";
import { shuffleArray, zerosArray } from "../../utils";

export default function EliminationDraw({
  modality,
  compList,
  teamList,
  category,
  runDraw,
  setRunDraw,
  deleteDraw,
  setDeleteDraw,
}) {
  const [allMatches, setAllMatches] = useState([]);
  const [playersInFinals, setPlayersInFinals] = useState(8);
  const [matchType, setMatchType] = useState("Kata");
  const [filtered, setFiltered] = useState([]);
  const ipcRenderer = window.ipcRenderer;

  const playerDistribution = (players, poolSize) => {
    const finalArray = [];
    if (poolSize === 1) {
      const playersPerPool = players.length / 2;
      if (playersPerPool % 1 === 0) {
        finalArray.push(2, 2);
      } else {
        finalArray.push(Math.round(playersPerPool), Math.floor(playersPerPool));
      }
    } else {
      const playersPerPool = players.length / 2;
      // resultado da primeira divisão por dois for inteiro
      if (playersPerPool % 1 === 0) {
        // resultado da proxima divisão por dois for decimal
        if ((playersPerPool / 2) % 1 !== 0) {
          finalArray.push(
            Math.round(playersPerPool / 2),
            Math.round(playersPerPool / 2)
          );
          finalArray.push(
            Math.floor(playersPerPool / 2),
            Math.floor(playersPerPool / 2)
          );
          // resultado da proxima divisão por dois for inteira
        } else {
          finalArray.push(
            playersPerPool / 2,
            playersPerPool / 2,
            playersPerPool / 2,
            playersPerPool / 2
          );
        }
        // resultado da primeira divisão por dois for decimal
      } else {
        const max = Math.round(playersPerPool);
        // se o valor por excesso dividido por dois for inteiro
        if ((max / 2) % 1 === 0) {
          finalArray.push(max / 2, max / 2);
          // se o valor por excesso dividido por dois for decimal
        } else {
          finalArray.push(Math.round(max / 2), Math.floor(max / 2));
        }
        const min = Math.floor(playersPerPool);
        // se o valor por defeito dividido por dois for inteiro
        if ((min / 2) % 1 === 0) {
          finalArray.push(min / 2, min / 2);
          // se o valor por defeito dividido por dois for decimal
        } else {
          finalArray.push(Math.round(min / 2), Math.floor(min / 2));
        }
      }
    }
    return shuffleArray(finalArray);
  };

  const insertPlayersToPool = (array, pool) => {
    const cloneArray = [...array];
    const allowedPlayers = playerDistribution(array, pool);
    // console.log(allowedPlayers);
    let drawStructure;
    if (pool === 1) {
      drawStructure = zerosArray(2, 2);
    } else {
      drawStructure = zerosArray(4, pool);
      // console.log(zerosArray(4, pool))
    }
    let i = 0;
    while (i < allowedPlayers.length) {
      let j = 0;
      while (j < allowedPlayers[i]) {
        for (let comp of cloneArray) {
          // insert here condition to skip same team
          if (!drawStructure[i].includes(comp)) {
            drawStructure[i][j] = comp;
            const index = cloneArray.indexOf(comp);
            cloneArray.splice(index, 1);
            break;
          } else {
            continue;
          }
        }
        if (
          drawStructure[i].filter((x) => x === 0).length ===
          pool - allowedPlayers[i]
        ) {
          for (let x = 0; x < drawStructure[i].length; x++) {
            if (drawStructure[i][x] === 0) {
              drawStructure[i][x] = "bye";
            }
          }
          break;
        }
        j++;
      }
      i++;
    }
    return drawStructure;
  };

  const createSingleMatch = (array, poolSize) => {
    // console.log(array);
    const pooling = insertPlayersToPool(array, poolSize);
    // console.log(insertPlayersToPool(array, poolSize));
    const poolMatches = [];
    for (let finalPool of pooling) {
      // console.log(finalPool);
      const byes =
        (poolSize === 1 ? 2 : poolSize) -
        finalPool.filter((comp) => comp !== "bye").length;
      // console.log(byes);
      const matchNumber =
        (finalPool.filter((comp) => comp !== "bye").length - byes) / 2;
      // console.log(matchNumber);
      const singleMatch = [];
      if (matchNumber !== 0 && poolSize !== 8) {
        let partidas = 0;
        while (partidas < poolSize && partidas <= matchNumber) {
          const player1 = finalPool.shift();
          const player2 = finalPool.shift();
          const pair = [player1, player2];
          // console.log(partidas);
          singleMatch.push(pair);
          if (finalPool.length === 0) {
            break;
          }
          partidas++;
        }
      } else if (matchNumber === 0 || poolSize === 8) {
        while (finalPool.length >= 2) {
          // console.log(finalPool.length);
          const player1 = finalPool.shift();
          const player2 = finalPool.pop();
          const pair = [player1, player2];
          singleMatch.push(pair);
        }
      }
      poolMatches.push(singleMatch);
    }
    return poolMatches;
  };

  const createMatches = (mainArray) => {
    const shuffledPlayers = shuffleArray(mainArray.slice());
    const matches = [];
    if (shuffledPlayers.length === 2) {
      const matches = [[[shuffledPlayers[0], shuffledPlayers[1]]]];
      return matches;
    } else if (shuffledPlayers.length > 2 && shuffledPlayers.length <= 4) {
      const poolSize = 4 / 4;
      const matches = createSingleMatch(shuffledPlayers, poolSize);
      return matches;
    } else if (shuffledPlayers.length > 4 && shuffledPlayers.length <= 8) {
      const poolSize = 8 / 4;
      const matches = createSingleMatch(shuffledPlayers, poolSize);
      return matches;
    } else if (shuffledPlayers.length > 8 && shuffledPlayers.length <= 16) {
      const poolSize = 16 / 4;
      const matches = createSingleMatch(shuffledPlayers, poolSize);
      return matches;
    } else if (shuffledPlayers.length > 16 && shuffledPlayers.length <= 32) {
      const poolSize = 32 / 4;
      const matches = createSingleMatch(shuffledPlayers, poolSize);
      return matches;
    } else if (shuffledPlayers.length > 32 && shuffledPlayers.length <= 64) {
      const poolSize = 64 / 4;
      const matches = createSingleMatch(shuffledPlayers, poolSize);
      return matches;
    }
    return matches;
  };

  useEffect(() => {
    if (modality === "Individual") {
      let keys = Object.keys(compList);
      let interArray = keys.filter((key) => {
        return compList[key];
      });
      setFiltered(interArray);
    } else if (modality === "Equipa") {
      let keys = Object.keys(teamList);
      let interArray = keys.filter((key) => {
        return teamList[key];
      });
      setFiltered(interArray);
    }
    if (runDraw) {
      if (modality === "Individual") {
        let keys = Object.keys(compList);
        let interArray = keys.filter((key) => {
          return compList[key];
        });
        setFiltered(interArray);
      } else if (modality === "Equipa") {
        let keys = Object.keys(teamList);
        let interArray = keys.filter((key) => {
          return teamList[key];
        });
        setFiltered(interArray);
      }
      // console.log(filtered);
      setAllMatches(shuffleArray(createMatches(filtered)));
      setRunDraw(false);
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
    modality,
    setFiltered,
    compList,
    teamList,
  ]);

  function triggerExcelGenerationWithData(data, file) {
    ipcRenderer.send("generate-excel", data, file);
  }

  const handleClick = () => {
    const data = [];
    data.splice(0, 0, ["", "", "", ""]);
    data.splice(0, 0, ["Cinto", "Nome", "Dorsal", "Dojo"]);
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
          filtered[i].split("|")[2],
        ]);
      }
    } else {
      // console.log(allMatches);
      for (let pool of allMatches) {
        for (let indivMatch of pool) {
          // console.log(indivMatch);
          const byeIndex = shuffleArray(indivMatch).indexOf("bye");
          if (byeIndex === 0) {
            data.push(
              ["Aka", "bye", "", ""],
              ["", "vs", "", ""],
              [
                "Shiro",
                indivMatch[1].split("|")[0],
                indivMatch[1].split("|")[1],
                indivMatch[1].split("|")[2],
              ]
            );
          } else if (byeIndex === 1) {
            data.push(
              [
                "Aka",
                indivMatch[0].split("|")[0],
                indivMatch[0].split("|")[1],
                indivMatch[0].split("|")[2],
              ],
              ["", "vs", "", ""],
              ["Shiro", "bye", "", ""]
            );
          } else {
            data.push(
              [
                "Aka",
                indivMatch[0].split("|")[0],
                indivMatch[0].split("|")[1],
                indivMatch[0].split("|")[2],
              ],
              ["", "vs", ""],
              [
                "Shiro",
                indivMatch[1].split("|")[0],
                indivMatch[1].split("|")[1],
                indivMatch[1].split("|")[2],
              ]
            );
          }
          data.push(["", "", "", ""]);
        }
      }
    }
    const drawFile = `${category.split(" ").join("_")}_Sorteio.xlsx`;
    triggerExcelGenerationWithData(data, drawFile);
  };
  // console.log(allMatches);

  return (
    <div className={styles.matchesDiv}>
      {allMatches.length !== 0
        ? modality === "Individual" && (
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
          )
        : ""}
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
        ? allMatches.map((pool, index) => (
            <>
              {pool.map((match, index) => (
                <div key={index} className={styles.eachMatch}>
                  {match[0].split("|")[0]} {match[0].split("|")[1]} vs{" "}
                  {match[1].split("|")[0]} {match[1].split("|")[1]}
                </div>
              ))}
            </>
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
