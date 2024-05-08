import styles from "./eliminationdraw.module.css";

export default function EliminationDraw({ compList, category }) {
  const ipcRenderer = window.ipcRenderer;
  const data = [];
  var keys = Object.keys(compList);
  var filtered = keys.filter((key) => {
    return compList[key];
  });

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const createSingleMatch = (array, byes) => {
    const singleMatch = [];
    for (let i = 0; i < byes; i++) {
      const player1 = array.shift();
      singleMatch.push([player1, "bye"]);
      data.push([
        player1.split("|")[1],
        player1.split("|")[0],
        "vs",
        "bye",
        "",
      ]);
    }
    while (array.length >= 2) {
      const player1 = array.shift();
      const player2 = array.shift();
      singleMatch.push([player1, player2]);
      data.push([
        player1.split("|")[1],
        player1.split("|")[0],
        "vs",
        player2.split("|")[0],
        player2.split("|")[1],
      ]);
    }
    return singleMatch;
  };

  const shuffledPlayers = shuffleArray(filtered.slice());

  const createMatches = () => {
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
  const allMacthes = shuffleArray(createMatches());

  function triggerExcelGenerationWithData(data, file) {
    ipcRenderer.send("generate-excel", data, file);
  }

  const handleClick = () => {
    const excelData = structuredClone(data);
    excelData.splice(0, 0, ["Dorsal", "Nome", "vs", "Nome", "Dorsal"]);
    excelData.splice(0, 0, ["", "Aka", "", "Shiro", ""]);
    const drawFile = `${category.split(" ").join("_")}_Matches.xlsx`;
    triggerExcelGenerationWithData(excelData, drawFile);
  };

  return (
    <div className={styles.matchesDiv}>
      {allMacthes.map((match, index) => (
        <div key={index} className={styles.eachMatch}>
          {match[0].split("|")[0]} {match[0].split("|")[1]} vs{" "}
          {match[1].split("|")[0]} {match[1].split("|")[1]}
        </div>
      ))}
      {allMacthes.length !== 0 ? (
        <button className={styles.downloadButton} onClick={handleClick}>
          Descarregar
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
