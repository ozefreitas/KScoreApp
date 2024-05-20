import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    setGroupByComp([]);
    function createGroup(groupsArray, compsArray) {
      for (let i = 0; i < groupsArray.length; i++) {
        const oneGroup = [];
        for (const element of groupsArray[i]) {
          const row = [];
          oneGroup.push(compsArray[element - 1]);
          row.push(
            i,
            compsArray[element - 1].split("|")[0],
            compsArray[element - 1].split("|")[1]
          );
          data.push(row);
        }
        setGroupByComp((prevGroupByGroup) => [...prevGroupByGroup, oneGroup]);
      }
    }
    createGroup(groups, filtered);
  }, [groups]);

  function triggerExcelGenerationWithData(data, file) {
    ipcRenderer.send("generate-excel", data, file);
  }

  const downloadByClick = () => {
    data.splice(0, 0, ["Grupo", "Nome", "Dorsal"]);
    const drawFile = `${category.split(" ").join("_")}_Draw.xlsx`;
    triggerExcelGenerationWithData(data, drawFile);
  };

  const changePageByClick = () => {
    navigate("/matchesdraw");
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
