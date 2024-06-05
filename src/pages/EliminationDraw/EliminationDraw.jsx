import { useEffect, useState } from "react";
import styles from "./eliminationdraw.module.css";
import { shuffleArray, zerosArray } from "../../utils";

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

  const playerDistribution = (array) => {
    const finalArray = [];
    const playersPerPool = array.length / 2;
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
    return shuffleArray(finalArray);
  };

  const insertPlayersToPool = (array, pool) => {
    const cloneArray = [...array];
    const allowedPlayers = playerDistribution(array);
    const drawStructure = zerosArray(pool);
    let i = 0;
    while (i < allowedPlayers.length) {
      let j = 0;
      while (j < allowedPlayers[i]) {
        for (let comp of cloneArray) {
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
          4 - allowedPlayers[i]
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
    const pooling = insertPlayersToPool(array, poolSize);
    const poolMatches = [];
    for (let finalPool of pooling) {
      const byes = poolSize - finalPool.filter((comp) => comp !== "bye").length;
      const matchNumber =
        (finalPool.filter((comp) => comp !== "bye").length - byes) / 2;
      const singleMatch = [];
      if (matchNumber !== 0) {
        let partidas = 0;
        while (partidas <= matchNumber) {
          const player1 = finalPool.shift();
          const player2 = finalPool.shift();
          const pair = [player1, player2];
          singleMatch.push(pair);
          partidas++;
        }
      } else {
        while (finalPool.length >= 2) {
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

  const createMatches = () => {
    const shuffledPlayers = shuffleArray(filtered.slice());
    const matches = [];
    if (shuffledPlayers.length === 2) {
      const matches = createSingleMatch(shuffledPlayers, 0);
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
    if (runDraw) {
      if (filtered.length >= playersInFinals) {
        setAllMatches(shuffleArray(createMatches()));
        setRunDraw(false);
        console.log(allMatches);
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
