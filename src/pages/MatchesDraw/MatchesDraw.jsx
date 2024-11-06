import styles from "./matchesdraw.module.css";
import FileMissing from "../../components/FileMissing/FileMissing";
import Header from "../../components/Header/Header";
import { shuffleArray } from "../../utils";
import { useEffect, useState, useCallback } from "react";

export default function MatchesDraw({
  draw,
  groupByComp,
  setCurrentPage,
  category,
  setCategory,
  modality,
  matchType,
  isDefault,
  setIsDefault,
}) {
  const [uniquePairs, setUniquePairs] = useState({});
  const [matchesByGroup, setMatchesByGroup] = useState({});
  const ipcRenderer = window.ipcRenderer;
  // const matchesByGroup = {};

  const minimizeRepetitions = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
      if (
        array[i][0] === array[i + 1][0] ||
        array[i][0] === array[i + 1][1] ||
        array[i][1] === array[i + 1][0] ||
        array[i][1] === array[i + 1][1]
      ) {
        for (let j = i + 2; j < array.length; j++) {
          if (
            array[i][0] !== array[j][0] &&
            array[i][0] !== array[j][1] &&
            array[i][1] !== array[j][0] &&
            array[i][1] !== array[j][1]
          ) {
            [array[i + 1], array[j]] = [array[j], array[i + 1]]; // Swap elements
            break;
          }
        }
      }
    }
    return array;
  };

  const shuffleAndMinimize = (obj) => {
    const shuffledObj = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const shuffledArray = shuffleArray([...obj[key]]); // Shuffle the inner arrays
        shuffledObj[key] = minimizeRepetitions(shuffledArray); // Minimize repetitions
      }
    }

    return shuffledObj;
  };

  const swapSides = (arr) => {
    if (Math.random() > 0.5) {
      [arr[0], arr[1]] = [arr[1], arr[0]];
    }
    return arr;
  };

  const makeMatchesByGroup = () => {
    groupByComp.forEach((group, group_index) => {
      switch (group.length) {
        case 2:
          {
            let i = 0;
            while (i < 3) {
              const pair = swapSides([group[0], group[1]]);
              setMatchesByGroup((prevMatchesByGroup) => ({
                ...prevMatchesByGroup,
                [group_index]: [
                  ...(prevMatchesByGroup[group_index] || []),
                  pair,
                ],
              }));
              i++;
            }
          }
          break;
        case 3:
          {
            // Generate all possible pairs and shuffle them
            const allPairs = [];
            for (let i = 0; i < group.length; i++) {
              for (let j = i + 1; j < group.length; j++) {
                const pair = swapSides([group[i], group[j]]);
                allPairs.push(pair);
              }
            }

            let done = false;
            let i = 0;
            let bestAthlete = null;
            let minDojoCount = Infinity;
            while (done === false) {
              const athlete = group[i];
              const dojoCount = group.filter(
                (a) => a.split("|")[2] === athlete.split("|")[2]
              ).length;
              if (dojoCount < minDojoCount) {
                minDojoCount = dojoCount;
                bestAthlete = athlete;
              }
              i++;
              if (i === 3) {
                done = true;
              }
            }
            const morePairs = [];
            const alreadyMatched = [];
            for (const pairs of allPairs) {
              for (const player of pairs) {
                if (player !== bestAthlete) {
                  if (
                    player.split("|")[2] !== bestAthlete.split("|")[2] &&
                    morePairs.length < 2 &&
                    !alreadyMatched.includes(player)
                  ) {
                    const newPair = [bestAthlete, player];
                    morePairs.push(newPair);
                    allPairs.push(newPair);
                    alreadyMatched.push(player);
                  }
                }
              }
            }
            setMatchesByGroup((prevMatchesByGroup) => ({
              ...prevMatchesByGroup,
              [group_index]: allPairs,
            }));
          }
          break;
        case 4:
          // Round-robin for groups of 4
          for (let i = 0; i < group.length; i++) {
            for (let j = i + 1; j < group.length; j++) {
              const pair = swapSides([group[i], group[j]]);
              setMatchesByGroup((prevMatchesByGroup) => ({
                ...prevMatchesByGroup,
                [group_index]: [
                  ...(prevMatchesByGroup[group_index] || []),
                  pair,
                ],
              }));
            }
          }
          break;
        case 5:
          {
            // Generate all possible pairs and shuffle them
            const allPairs = [];
            for (let i = 0; i < group.length; i++) {
              for (let j = i + 1; j < group.length; j++) {
                const pair = swapSides([group[i], group[j]]);
                allPairs.push(pair);
              }
            }
            shuffleArray(allPairs); // Shuffle for randomness

            let athlete1save = allPairs[0][0];
            let athlete2save = allPairs[0][1];

            for (let i = 0; i < group.length; i++) {
              let pair = allPairs[i];
              let athlete1 = pair[0];
              let athlete2 = pair[1];
              if (
                athlete1save !== athlete1 &&
                athlete2save !== athlete2 &&
                athlete1save !== athlete2 &&
                athlete2save !== athlete1
              ) {
                allPairs.splice(i, 1);
                allPairs.shift();
                setMatchesByGroup((prevMatchesByGroup) => ({
                  ...prevMatchesByGroup,
                  [group_index]: allPairs,
                }));
                break;
              }
            }
          }
          break;
        case 6: {
          const sortedGroup = group
            .slice()
            .sort((a, b) => a.split("|")[2].localeCompare(b.split("|")[2]));
          console.log(sortedGroup);
          // Split into two subgroups of 3 for groups of 6
          const subgroupA = sortedGroup.slice(0, 3);
          const subgroupB = sortedGroup.slice(3, 6);

          // Each athlete in subgroupA plays each athlete in subgroupB
          subgroupA.forEach((athleteA) => {
            subgroupB.forEach((athleteB) => {
              const pair = swapSides([athleteA, athleteB]);
              setMatchesByGroup((prevMatchesByGroup) => ({
                ...prevMatchesByGroup,
                [group_index]: [
                  ...(prevMatchesByGroup[group_index] || []),
                  pair,
                ],
              }));
            });
          });
          break;
        }
      }
    });
  };

  // useEffect(() => {
  //   makeMatchesByGroup();
  //   const shuffledObject = shuffleAndMinimize(matchesByGroup);
  //   const finalDraw = swapSides(shuffledObject);
  //   setUniquePairs(finalDraw);
  // }, [groupByComp]);

  const handleClick = () => {
    setMatchesByGroup({});
    makeMatchesByGroup();
    const shuffledObject = shuffleAndMinimize(matchesByGroup);
    setUniquePairs(shuffledObject);
  };

  function triggerExcelGenerationWithData(data, file) {
    ipcRenderer.send("generate-excel", data, file);
  }

  const downloadByClick = (groupNumber) => {
    const data = [];
    data.splice(0, 0, ["Dorsal", "Nome", "vs", "Nome", "Dorsal"]);
    data.splice(0, 0, ["", "Shiro", "", "Aka", ""]);
    for (let i of uniquePairs[groupNumber]) {
      data.push([
        i[0].split("|")[1],
        i[0].split("|")[0],
        "vs",
        i[1].split("|")[0],
        i[1].split("|")[1],
      ]);
    }
    const drawFile = `${category.split(" ").join("_")}_Partidas_Grupo_${
      parseInt(groupNumber) + 1
    }.xlsx`;
    triggerExcelGenerationWithData(data, drawFile);
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <div className={styles.scrollable}>
      <Header
        draw={draw}
        category={category}
        setCategory={setCategory}
        setIsDefault={setIsDefault}
        isDefault={isDefault}
        modality={modality}
        matchType={matchType}
      ></Header>
      <div className={styles.centerForm}>
        {groupByComp.length === 0 ? (
          <FileMissing
            match="matchesDraw"
            draw={true}
            groupByComp={groupByComp}
            setCurrentPage={setCurrentPage}
          ></FileMissing>
        ) : (
          ""
        )}
        {Object.keys(uniquePairs).map((groupNumber) => (
          <div key={groupNumber} className={styles.groupDiv}>
            <span className={styles.groupNumber}>
              Grupo {parseInt(groupNumber) + 1}
            </span>
            <div className={styles.matchesDiv}>
              <div className={styles.beltColor}>
                <span style={{ color: "#bf0303" }}>Aka</span>
                <span>Shiro</span>
              </div>
              {uniquePairs[groupNumber].map((matches, index) => (
                <div key={index} className={styles.eachMatch}>
                  <span>
                    {matches[0].split("|")[0]} {matches[0].split("|")[1]}
                  </span>
                  <span className={styles.vsCenter}>vs</span>
                  <span>
                    {matches[1].split("|")[0]} {matches[1].split("|")[1]}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.downloadDiv}>
              <button
                className={styles.downloadButton}
                onClick={() => downloadByClick(groupNumber)}
              >
                Descarregar
              </button>
            </div>
          </div>
        ))}
        {Object.keys(groupByComp).length !== 0 ? (
          <button
            className={styles.drawButton}
            onClick={handleClick}
            onKeyDown={handleKeyPress}
          >
            Novo Sorteio
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
