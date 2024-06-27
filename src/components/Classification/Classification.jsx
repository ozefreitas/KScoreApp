import styles from "./classification.module.css";
import React from "react";

export default function Classification({ category, match, results }) {
  const sortResults = (object) => {
    const sortable = Object.fromEntries(
      Object.entries(object).sort((a, b) => {
        const finalA = a[1].final;
        const finalB = b[1].final;
        return finalB - finalA;
      })
    );
    return sortable;
  };
  const checkTie = (sortedResults) => {
    let isTie = false;
    let tieScore = 0;
    let tiedCompetitors = [];
    for (const [comp, result] of Object.entries(sortedResults)) {
      if (tieScore === 0) {
        tieScore = result.final;
        tiedCompetitors.push({ [comp]: result });
      } else if (isTie === false && tieScore === result.final) {
        isTie = true;
        tieScore = result.final;
        tiedCompetitors.push({ [comp]: result });
      } else if (isTie === false && tieScore !== result.final) {
        tieScore = result.final;
        if (tiedCompetitors.length === 1) {
          tiedCompetitors = [{ [comp]: result }];
        } else {
          tiedCompetitors.push({ [comp]: result });
        }
      } else if (isTie === true && tieScore === result.final) {
        tiedCompetitors.push({ [comp]: result });
      } else if (isTie === true && tieScore !== result.final) {
        isTie = false;
        tieScore = result.final;
        checkMins(tiedCompetitors, sortedResults);
      }
    }
  };

  const checkMins = (tiedList, sortedResults) => {
    let upOrDown = Object.values(tiedList[0])[0].min;
    if (Object.values(tiedList[1])[0].min > upOrDown) {
      const compName = Object.keys(tiedList[1])[0];
      sortedResults[compName].final = sortedResults[compName].final + 0.01;
      sortedResults[compName].obs = "Ganha por pontuação mínima mais alta";
    } else if (Object.values(tiedList[1])[0].min < upOrDown) {
      const compName = Object.keys(tiedList[0])[0];
      sortedResults[compName].final = sortedResults[compName].final + 0.01;
      sortedResults[compName].obs = "Ganha por pontuação mínima mais alta";
    } else if (Object.values(tiedList[1])[0].min === upOrDown) {
      checkMaxs(tiedList, sortedResults);
    }
  };

  const checkMaxs = (tiedList, sortedResults) => {
    let upOrDown = Object.values(tiedList[0])[0].max;
    if (Object.values(tiedList[1])[0].max > upOrDown) {
      const compName = Object.keys(tiedList[1])[0];
      sortedResults[compName].final = sortedResults[compName].final + 0.01;
      sortedResults[compName].obs = "Ganha por pontuação máxima mais alta";
    } else if (Object.values(tiedList[1])[0].max < upOrDown) {
      const compName = Object.keys(tiedList[0])[0];
      sortedResults[compName].final = sortedResults[compName].final + 0.01;
      sortedResults[compName].obs = "Ganha por pontuação máxima mais alta";
    } else if (Object.values(tiedList[1])[0].max === upOrDown) {
      const compName1 = Object.keys(tiedList[0])[0];
      const compName2 = Object.keys(tiedList[1])[0];
      sortedResults[compName1].obs = "Empate";
      sortedResults[compName2].obs = "Empate";
    }
  };

  // const initial = {
  //   "001-José Freitas-ASKVIZELA": {
  //     final: 24.6,
  //     max: 8.3,
  //     min: 8.1,
  //     obs: "",
  //   },
  //   "002-Andreia Rodrigues-AKFAFE": {
  //     final: 24.6,
  //     max: 8.3,
  //     min: 8.2,
  //     obs: "",
  //   },
  //   "003-Gabriela Durães-AKFAFE": {
  //     final: 24.0,
  //     max: 8.3,
  //     min: 8.1,
  //     obs: "",
  //   },
  //   "004-Diogo Leite-C.B.FAFE": { final: 25.0, max: 8.3, min: 8.1, obs: "" },
  //   "005-Álvaro Abreu-R.B.OLEIROS": {
  //     final: 25.8,
  //     max: 8.3,
  //     min: 8.1,
  //     obs: "",
  //   },
  // };
  const sortable = sortResults(results);
  checkTie(sortable);
  const finalSortable = sortResults(sortable);

  const getMedalClass = (index) => {
    switch (index) {
      case 0:
        return styles.gold;
      case 1:
        return styles.silver;
      case 2:
        return styles.bronze;
      default:
        return "";
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.overDiv}>
        Resultados da prova de {match} {category !== "default" ? category : ""}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.classificationContainer}>
          {Object.keys(finalSortable)
            .slice(0, 3)
            .map((keyName, i, arr) => (
              <React.Fragment key={i}>
                <div className={`${styles.line} ${getMedalClass(i)}`} key={i}>
                  <div>{keyName.split("-")[0]}</div>
                  <div className={styles.clubCenter}>
                    {keyName.split("-")[2]}
                  </div>
                  <div className={styles.nameCenter}>
                    {keyName.split("-")[1]}
                  </div>
                  <div>
                    {parseFloat(finalSortable[keyName].final).toFixed(1)}
                  </div>
                </div>
                {i < arr.length - 1 && <hr className={styles.divider} />}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}
