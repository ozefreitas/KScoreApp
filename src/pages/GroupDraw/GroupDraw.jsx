import Header from "../../components/Header/Header";
import styles from "./groupdraw.module.css";
import CompetitorList from "./CompetitorList/CompetitorList";
import { useRef, useState } from "react";
import GroupList from "./GroupList/GroupList";
import CustomNotification from "../../components/CustomNotification/CustomNotification";
import EliminationDraw from "../EliminationDraw/EliminationDraw";

export default function GroupDraw({
  competitors,
  groupByComp,
  setGroupByComp,
  draw,
  isMenuOpen,
  setIsMenuOpen,
  blinking,
  setBlinking,
  isDefault,
  setIsDefault,
  category,
  setCategory,
  setCurrentPage,
  showNotification,
  setShowNotification,
  notificationTitle,
  setNotificationTitle,
  notificationBody,
  setNotificationBody,
  actions,
  setActions,
  proceed,
  setProceed,
}) {
  const [compList, setCompList] = useState({});
  const [groups, setGroups] = useState([]);
  const [runDraw, setRunDraw] = useState(false);
  const [deleteDraw, setDeleteDraw] = useState(false);
  const drawRef = useRef(null);
  const topRef = useRef(null);
  // const ipcRenderer = window.ipcRenderer;
  // ipcRenderer.on('excel-generation-error', (event, errorMessage) => {
  //   setShowNotification(true)
  //   setNotificationTitle("Erro na transferência")
  //   setNotificationBody(errorMessage);
  // });

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
        setIsDefault={setIsDefault}
        isDefault={isDefault}
      ></Header>
      {showNotification ? (
        <CustomNotification
          setShowNotification={setShowNotification}
          title={notificationTitle}
          body={notificationBody}
          actions={actions}
          setActions={setActions}
          setProceed={setProceed}
        ></CustomNotification>
      ) : (
        ""
      )}
      <div ref={topRef} id="topRef"></div>
      <CompetitorList
        competitors={competitors}
        category={category}
        setCategory={setCategory}
        setCompList={setCompList}
        setGroups={setGroups}
        drawRef={drawRef}
        topRef={topRef}
        setIsDefault={setIsDefault}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setBlinking={setBlinking}
        blinking={blinking}
        setShowNotification={setShowNotification}
        setNotificationTitle={setNotificationTitle}
        setNotificationBody={setNotificationBody}
        setActions={setActions}
        proceed={proceed}
        setProceed={setProceed}
        setRunDraw={setRunDraw}
        setDeleteDraw={setDeleteDraw}
      ></CompetitorList>
      <div ref={drawRef} className={styles.drawContainer}>
        {draw === "group" ? (
          <GroupList
            compList={compList}
            groups={groups}
            category={category}
            groupByComp={groupByComp}
            setGroupByComp={setGroupByComp}
            setCurrentPage={setCurrentPage}
          ></GroupList>
        ) : (
          <EliminationDraw
            compList={compList}
            category={category}
            runDraw={runDraw}
            setRunDraw={setRunDraw}
            deleteDraw={deleteDraw}
            setDeleteDraw={setDeleteDraw}
          ></EliminationDraw>
        )}
      </div>
      <div className={styles.backToTop}>
        <span onClick={ScrollTop}>Voltar ao topo</span>
      </div>
    </div>
  );
}
