import styles from "./matchesdraw.module.css";
import FileMissing from "../../components/FileMissing/FileMissing";
import Header from "../../components/Header/Header";
import { useEffect, useState, useCallback } from "react";

export default function MatchesDraw({
  draw,
  groupByComp,
  setCurrentPage,
  category,
  setCategory,
  setIsDefault,
  isDefault,
}) {
  const [uniquePairs, setUniquePairs] = useState({});
  const ipcRenderer = window.ipcRenderer;
  const matchesByGroup = {};
  console.log(uniquePairs);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // const shuffleInnerArrays = (obj) => {
  //   const shuffledObj = {};
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       shuffledObj[key] = shuffleArray([...obj[key]]); // Shuffle the inner arrays
  //     }
  //   }
  //   return shuffledObj;
  // };

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

  const makeMatchesByGroup = () => {
    for (let i = 0; i < groupByComp.length; i++) {
      const matches = {};
      for (const element of groupByComp[i]) {
        if (!Object.keys(matches).includes(element)) {
          matches[element] = [];
        }
      }

      matchesByGroup[i] = matches;
      const shuffledCompList = shuffleArray(groupByComp[i]);
      for (let x = 0; x < shuffledCompList.length; x++) {
        const name1 = shuffledCompList[x];
        for (let y = x + 1; y < shuffledCompList.length; y++) {
          const name2 = shuffledCompList[y];
          // if both already with 3 matches
          if (
            matchesByGroup[i][name1].length >= 3 ||
            matchesByGroup[i][name2].length >= 3
          ) {
            continue;
            // only of both are not full
          } else if (
            matchesByGroup[i][name1].length < 3 &&
            matchesByGroup[i][name2].length < 3
          ) {
            matchesByGroup[i][name1].push([name1, name2]);
            matchesByGroup[i][name2].push([name1, name2]);
          }
        }
      }

      const names = Object.keys(matchesByGroup[i]);
      const notMatched = [];
      names.map((nam) => {
        if (matchesByGroup[i][nam].length === 1) {
          notMatched.push(nam);
        }
        return notMatched;
      });

      const clone = structuredClone(matchesByGroup[i]);
      // console.log(clone)

      for (let nomatch of notMatched) {
        let j = 0;
        for (let names of groupByComp[j].slice(i)) {
          if (!notMatched.includes(names)) {
            if (clone[nomatch].length < 3) {
              clone[nomatch].push([nomatch, names]);
              j++;
            }
          }
        }
      }
    }
  };

  const getUniquePairs = (nestedData) => {
    const uniquePairsSet = new Set();
    const uniquePairsObject = {};

    Object.keys(nestedData).forEach((key) => {
      uniquePairsObject[key] = [];
      Object.keys(nestedData[key]).forEach((secondKey) => {
        nestedData[key][secondKey].forEach((pair) => {
          const pairString = JSON.stringify(pair); // Convert pair to string for Set comparison
          if (!uniquePairsSet.has(pairString)) {
            uniquePairsSet.add(pairString);
            if (Math.random() > 0.5) {
              [pair[0], pair[1]] = [pair[1], pair[0]];
            }
            uniquePairsObject[key].push(pair);
          }
        });
      });
    });

    return uniquePairsObject;
  };

  useEffect(() => {
    makeMatchesByGroup();
    const unShuffledObject = getUniquePairs(matchesByGroup);
    const shuffledObject = shuffleAndMinimize(unShuffledObject);
    // const shuffledObject = shuffleInnerArrays(unShuffledObject);
    setUniquePairs(shuffledObject);
  }, [groupByComp]);

  const handleClick = useCallback(() => {
    makeMatchesByGroup();
    const unShuffledObject = getUniquePairs(matchesByGroup);
    const shuffledObject = shuffleAndMinimize(unShuffledObject);
    // const shuffledObject = shuffleInnerArrays(unShuffledObject);
    setUniquePairs(shuffledObject);
  });

  function triggerExcelGenerationWithData(data, file) {
    ipcRenderer.send("generate-excel", data, file);
  }

  const downloadByClick = (groupNumber) => {
    const data = [];
    data.splice(0, 0, ["Dorsal", "Nome", "vs", "Nome", "Dorsal"]);
    data.splice(0, 0, ["", "Aka", "", "Shiro", ""]);
    for (let i of uniquePairs[groupNumber]) {
      data.push([
        i[0].split("|")[1],
        i[0].split("|")[0],
        "vs",
        i[1].split("|")[0],
        i[1].split("|")[1],
      ]);
    }
    console.log(data);
    const drawFile = `${category
      .split(" ")
      .join("_")}_Group${groupNumber}Matches.xlsx`;
    // console.log(drawFile);
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
