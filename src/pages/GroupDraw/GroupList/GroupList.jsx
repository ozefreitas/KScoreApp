import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shuffleArray } from "../../../utils";
import styles from "./grouplist.module.css";
import React from "react";

export default function GroupList({
  compList,
  groups,
  category,
  groupByComp,
  setGroupByComp,
  setCurrentPage,
}) {
  const ipcRenderer = window.ipcRenderer;
  const data = [];
  const navigate = useNavigate();
  let keys = Object.keys(compList);
  let filtered = keys.filter((key) => {
    return compList[key];
  });

  const minDojoConflictsDraw = useCallback(
    (athletes) => {
      shuffleArray(athletes);
      if (athletes.length === 3 || athletes.length === 2) {
        // groupByComp must be an array of arrays
        setGroupByComp([athletes]);
      } else {
        const maxNumberAthletesPerGroup = 6;
        const minNumberAthletesPerGroup = 4;
        const numGroups = Math.ceil(
          athletes.length / minNumberAthletesPerGroup
        );
        const groups = Array.from({ length: numGroups }, () => []);
        athletes.forEach((athlete) => {
          let bestGroup = null;
          let minDojoCount = Infinity;

          groups.forEach((group) => {
            const dojoCount = group.filter(
              (a) => a.split("|")[2] === athlete.split("|")[2]
            ).length;
            if (
              dojoCount < minDojoCount &&
              group.length < minNumberAthletesPerGroup
            ) {
              bestGroup = group;
              minDojoCount = dojoCount;
            }
          });

          // Place athlete in the best group found
          bestGroup.push(athlete);
        });

        // when equall to 7, won't distribute
        if (athletes.length !== 7 && athletes.length !== 1) {
          // if there's more athletes than the ones needed to have 4 per group
          if (athletes.length % minNumberAthletesPerGroup > 0) {
            // last group will always be the one with the remainer of the athletes
            groups[groups.length - 1].forEach((athlete) => {
              // do the same process
              let bestGroup = null;
              let minDojoCount = Infinity;
              groups.slice(0, groups.length - 1).forEach((group) => {
                const dojoCount = group.filter(
                  (a) => a.split("|")[2] === athlete.split("|")[2]
                ).length;
                if (
                  dojoCount < minDojoCount &&
                  group.length < maxNumberAthletesPerGroup
                ) {
                  bestGroup = group;
                  minDojoCount = dojoCount;
                }
              });
              // athlete is added to one of the already "full" groups
              bestGroup.push(athlete);
            });
            // last group has already been distributed
            groups.pop();
          }
        }
        setGroupByComp(groups);
      }
    },
    [setGroupByComp]
  );

  useEffect(() => {
    setGroupByComp([]);
    minDojoConflictsDraw(filtered);
  }, [groups]);

  function triggerExcelGenerationWithData(data, file) {
    ipcRenderer.send("generate-excel", data, file);
  }

  const downloadByClick = () => {
    data.splice(0, 0, ["Grupo", "Dojo", "Nome", "Dorsal"]);
    let i = 0;
    groupByComp.forEach((group) => {
      i++;
      group.forEach((athlete) => {
        let row = [];
        row.push(
          i,
          athlete.split("|")[2],
          athlete.split("|")[0],
          athlete.split("|")[1]
        );
        data.push(row);
      });
    });
    console.log(data);
    const drawFile = `${category.split(" ").join("_")}_Sorteio.xlsx`;
    triggerExcelGenerationWithData(data, drawFile);
  };

  const changePageByClick = () => {
    setCurrentPage({
      home: false,
      elimDraw: false,
      groupDraw: false,
      matchesDraw: true,
      kataElim: false,
      kataFinal: false,
      teamKata: false,
      kumite: false,
      teamKummite: false,
      credits: false,
    });
    navigate("/matchesdraw");
  };

  return (
    <div className={styles.drawnGroupsDiv}>
      {groupByComp.map((group, index) => (
        <div key={index} className={styles.eachGroup}>
          {group.map((indivGroup, index) => (
            <div key={index}>
              {indivGroup.split("|")[0]} {indivGroup.split("|")[1]}
            </div>
          ))}
        </div>
      ))}
      {groups.length !== 0 ? (
        <React.Fragment>
          <button className={styles.downloadButton} onClick={downloadByClick}>
            Descarregar
          </button>
          <button className={styles.downloadButton} onClick={changePageByClick}>
            Iniciar sorteio de partidas
          </button>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
}
