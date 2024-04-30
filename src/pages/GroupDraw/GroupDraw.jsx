import Header from "../../components/Header";
import styles from "./groupdraw.module.css";
import CompetitorList from "./CompetitorList/CompetitorList";
import { useRef, useState } from "react";
import GroupList from "./GroupList/GroupList";

export default function GroupDraw({
  draw,
  competitors,
  setIsMenuOpen,
  isMenuOpen,
  setBlinking,
  blinking,
}) {
  const [category, setCategory] = useState("default");
  const [compList, setCompList] = useState({});
  const [groups, setGroups] = useState([]);
  const [isDefault, setIsDefault] = useState(true);
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
        setCategory={setCategory}
        setIsDefault={setIsDefault}
        isDefault={isDefault}
      ></Header>
      <div ref={topRef} id="topRef"></div>
      <CompetitorList
        competitors={competitors}
        category={category}
        setCategory={setCategory}
        compList={compList}
        setCompList={setCompList}
        setGroups={setGroups}
        drawRef={drawRef}
        topRef={topRef}
        setIsDefault={setIsDefault}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setBlinking={setBlinking}
        blinking={blinking}
      ></CompetitorList>
      <div ref={drawRef} className={styles.drawContainer}>
        <GroupList compList={compList} groups={groups}></GroupList>
      </div>
      <div className={styles.backToTop}>
        <button className={styles.downloadButton}>Descarregar</button>
        <span onClick={ScrollTop}>Voltar ao topo</span>
      </div>
    </div>
  );
}
