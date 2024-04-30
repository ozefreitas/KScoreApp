import styles from "./grouplist.module.css";

export default function GroupList({ compList, groups }) {
  var keys = Object.keys(compList);
  var filtered = keys.filter((key) => {
    return compList[key];
  });

  const groupByComp = [];
  function createGroup(groupsArray, compsArray) {
    for (let i = 0; i < groupsArray.length; i++) {
      const oneGroup = [];
      for (let j = 0; j < groupsArray[i].length; j++) {
        oneGroup.push(compsArray[groupsArray[i][j] - 1]);
      }
      groupByComp.push(oneGroup);
    }
  }
  createGroup(groups, filtered);

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
    </div>
  );
}
