import Header from "../../components/Header/Header";
import styles from "./groupdraw.module.css";
import CompetitorList from "./CompetitorList/CompetitorList";
import { useRef, useState } from "react";
import GroupList from "./GroupList/GroupList";
import CustomNotification from "../../components/CustomNotification/CustomNotification";
import EliminationDraw from "../EliminationDraw/EliminationDraw";
import { executeScroll } from "../../utils";

export default function GroupDraw({
  competitors,
  teams,
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
  modality,
  setModality,
  matchType,
  setMatchType,
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
  compRef,
  teamRef
}) {
  const [compList, setCompList] = useState({});
  const [teamList, setTeamList] = useState({});
  const [groups, setGroups] = useState([]);
  const [runDraw, setRunDraw] = useState(false);
  const [deleteDraw, setDeleteDraw] = useState(false);
  const drawRef = useRef(null);
  const topRef = useRef(null);
  // const ipcRenderer = window.ipcRenderer;
  // ipcRenderer.on("excel-generation-error", (event, errorMessage) => {
  //   setShowNotification(true);
  //   setNotificationTitle("Erro na transferência");
  //   setNotificationBody(errorMessage);
  // });

  const ScrollTop = () => {
    executeScroll(topRef);
  };

  return (
    <div className={styles.scrollable}>
      <Header
        draw={draw}
        category={category}
        setCategory={setCategory}
        modality={modality}
        setModality={setModality}
        setIsDefault={setIsDefault}
        isDefault={isDefault}
        matchType={matchType}
        setMatchType={setMatchType}
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
        draw={draw}
        competitors={competitors}
        teams={teams}
        category={category}
        setCategory={setCategory}
        modality={modality}
        setModality={setModality}
        matchType={matchType}
        setMatchType={setMatchType}
        setCompList={setCompList}
        setTeamList={setTeamList}
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
        compRef={compRef}
        teamRef={teamRef}
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
            modality={modality}
            compList={compList}
            teamList={teamList}
            category={category}
            matchType={matchType}
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
