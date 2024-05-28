import NavBar from "./components/NavBar/NavBar";
import NavButton from "./components/NavButton/NavButton";
import Home from "./pages/Home";
import KataElim from "./pages/KataElim/KataElim";
import KataFinal from "./pages/KataFinal/KataFinal";
import Kumite from "./pages/Kumite/Kumite";
import TeamKumite from "./pages/TeamKumite/TeamKumite";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import TeamKata from "./pages/TeamKata/TeamKata";
import Login from "./pages/Login/Login";
import GroupDraw from "./pages/GroupDraw/GroupDraw";
import MatchesDraw from "./pages/MatchesDraw/MatchesDraw";
import Credits from "./pages/Credits/Credits";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [competitors, setCompetitors] = useState([]);
  const [groupByComp, setGroupByComp] = useState([]);
  const [teams, setTeams] = useState([]);
  const [katas, setKatas] = useState([]);
  const [category, setCategory] = useState("default");
  const [blinking, setBlinking] = useState({
    comp: false,
    team: false,
    kata: false,
  });
  const [isPinRight, setIsPinRight] = useState(false);
  const [isDefault, setIsDefault] = useState({
    modality: true,
    category: true,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationBody, setNotificationBody] = useState("");
  const [actions, setActions] = useState(false);
  const [proceed, setProceed] = useState(true);
  const [currentPage, setCurrentPage] = useState({
    home: true,
    elimDraw: false,
    groupDraw: false,
    matchesDraw: false,
    kataElim: false,
    kataFinal: false,
    teamKata: false,
    kumite: false,
    teamKummite: false,
    credits: false,
  });
  const [modality, setModality] = useState("default");

  useEffect(() => {
    setIsDefault((prevState) => ({ ...prevState, modality: true }));
    setModality("default");
  }, [currentPage]);
  return (
    <div className="App">
      {isPinRight ? (
        <div>
          <NavButton
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            setBlinking={setBlinking}
          ></NavButton>
          <NavBar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            setCompetitors={setCompetitors}
            setTeams={setTeams}
            setKatas={setKatas}
            blinking={blinking}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></NavBar>
        </div>
      ) : (
        ""
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Login
              isPinRight={isPinRight}
              setIsPinRight={setIsPinRight}
            ></Login>
          }
        ></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/eliminationdraw"
          element={
            <GroupDraw
              competitors={competitors}
              teams={teams}
              draw="elimination"
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              blinking={blinking}
              setBlinking={setBlinking}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              category={category}
              setCategory={setCategory}
              modality={modality}
              setModality={setModality}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
              actions={actions}
              setActions={setActions}
              proceed={proceed}
              setProceed={setProceed}
            ></GroupDraw>
          }
        ></Route>
        <Route
          path="/groupdraw"
          element={
            <GroupDraw
              competitors={competitors}
              teams={teams}
              groupByComp={groupByComp}
              setGroupByComp={setGroupByComp}
              draw="group"
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              blinking={blinking}
              setBlinking={setBlinking}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              category={category}
              setCategory={setCategory}
              setCurrentPage={setCurrentPage}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
              actions={actions}
              setActions={setActions}
              proceed={proceed}
              setProceed={setProceed}
            ></GroupDraw>
          }
        ></Route>
        <Route
          path="/matchesdraw"
          element={
            <MatchesDraw
              draw="matches"
              groupByComp={groupByComp}
              setCurrentPage={setCurrentPage}
              category={category}
              setCategory={setCategory}
              setIsDefault={setIsDefault}
              isDefault={isDefault}
            ></MatchesDraw>
          }
        ></Route>
        <Route
          path="/kataelim"
          element={
            <KataElim
              match="kata"
              competitors={competitors}
              katas={katas}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              blinking={blinking}
              setBlinking={setBlinking}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
            ></KataElim>
          }
        ></Route>
        <Route
          path="/katafinal"
          element={
            <KataFinal
              match="katafinal"
              competitors={competitors}
              katas={katas}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              blinking={blinking}
              setBlinking={setBlinking}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
            ></KataFinal>
          }
        ></Route>
        <Route
          path="/teamkata"
          element={
            <TeamKata
              match="teamkata"
              katas={katas}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              blinking={blinking}
              setBlinking={setBlinking}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
            ></TeamKata>
          }
        ></Route>
        <Route
          path="/kumite"
          element={
            <Kumite
              match="kumite"
              competitors={competitors}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              blinking={blinking}
              setBlinking={setBlinking}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
            ></Kumite>
          }
        ></Route>
        <Route
          path="/teamkumite"
          element={
            <TeamKumite
              match="teamkumite"
              competitors={competitors}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              blinking={blinking}
              setBlinking={setBlinking}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
            ></TeamKumite>
          }
        ></Route>
        <Route path="/credits" element={<Credits></Credits>}></Route>
      </Routes>
    </div>
  );
}

export default App;
