import styles from "./matchesdraw.module.css";
import FileMissing from "../../components/FileMissing/FileMissing";
import Header from "../../components/Header/Header";
import { useState } from "react";

export default function MatchesDraw({
  draw,
  groupByComp,
  setCurrentPage,
  category,
  setCategory,
  setIsDefault,
  isDefault,
}) {
  const [runMatches, setRunMatches] = useState(false);
  const ipcRenderer = window.ipcRenderer;
  const data = [];
  const matchesByGroup = {};

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

  makeMatchesByGroup();

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

  const uniquePairs = getUniquePairs(matchesByGroup);

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
          </div>
        ))}
      </div>
    </div>
  );
}
