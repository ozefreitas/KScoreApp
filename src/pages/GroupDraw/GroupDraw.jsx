import Header from "../../components/Header";
import styles from "./groupdraw.module.css";
import CompetitorList from "./CompetitorList/CompetitorList";
import { useRef, useState } from "react";
import GroupList from "./GroupList/GroupList";

export default function GroupDraw({ draw, competitors }) {
  const [category, setCategory] = useState(null);
  const [compList, setCompList] = useState({});
  const [groups, setGroups] = useState([]);
  const myRef = useRef(null)

  return (
    <div className={styles.scrollable}>
      <Header
        draw={draw}
        category={category}
        setCategory={setCategory}
      ></Header>
      <CompetitorList
        competitors={competitors}
        category={category}
        compList={compList}
        setCompList={setCompList}
        setGroups={setGroups}
        refProp={myRef}
      ></CompetitorList>
      <div ref={myRef} className={styles.drawContainer}>
        <GroupList compList={compList} groups={groups} refProp={myRef}></GroupList>
      </div>
    </div>
  );
}
