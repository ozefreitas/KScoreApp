import Header from "../../components/Header";
import styles from "./groupdraw.module.css";
import CompetitorList from "./CompetitorList/CompetitorList";
import { useRef, useState } from "react";
import GroupList from "./GroupList/GroupList";

export default function GroupDraw({ draw, competitors }) {
  const [category, setCategory] = useState(null);
  const [compList, setCompList] = useState({});
  const [groups, setGroups] = useState([]);
  const drawRef = useRef(null);
  const topRef = useRef(null);

  const ScrollTop = () => {
    const executeScroll = () =>
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    executeScroll();
  };

  return (
    <div className={styles.scrollable}>
      <Header
        draw={draw}
        category={category}
        setCategory={setCategory}
      ></Header>
      <div ref={topRef}></div>
        <CompetitorList
          competitors={competitors}
          category={category}
          compList={compList}
          setCompList={setCompList}
          setGroups={setGroups}
          drawRef={drawRef}
        ></CompetitorList>
      <div ref={drawRef} className={styles.drawContainer}>
        <GroupList compList={compList} groups={groups}></GroupList>
      </div>
      <div className={styles.backToTop}>
        <span onClick={ScrollTop}>Voltar ao topo</span>
      </div>
    </div>
  );
}
