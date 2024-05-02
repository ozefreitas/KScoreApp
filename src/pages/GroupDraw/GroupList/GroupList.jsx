import styles from "./grouplist.module.css";

export default function GroupList({ compList, groups, category }) {
  const ipcRenderer = window.ipcRenderer;
  const groupByComp = [];
  const data = [];
  var keys = Object.keys(compList);
  var filtered = keys.filter((key) => {
    return compList[key];
  });

  function createGroup(groupsArray, compsArray) {
    for (let i = 0; i < groupsArray.length; i++) {
      const oneGroup = [];
      for (let j = 0; j < groupsArray[i].length; j++) {
        const row = [];
        oneGroup.push(compsArray[groupsArray[i][j] - 1]);
        row.push(
          i,
          compsArray[groupsArray[i][j] - 1].split("|")[0],
          compsArray[groupsArray[i][j] - 1].split("|")[1]
        );
        data.push(row);
      }
      groupByComp.push(oneGroup);
    }
  }
  createGroup(groups, filtered);

  function triggerExcelGenerationWithData(data, file) {
    ipcRenderer.send("generate-excel", data, file);
  }

  const handleClick = () => {
    data.splice(0, 0, ["Grupo", "Nome", "Dorsal"]);
    const drawFile = `${category.split(" ").join("_")}_Draw.xlsx`;
    console.log(drawFile)
    triggerExcelGenerationWithData(data, drawFile);
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
      <button className={styles.downloadButton} onClick={handleClick}>
        Descarregar
      </button>
    </div>
  );
}
