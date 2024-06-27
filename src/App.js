import NavBar from "./components/NavBar/NavBar";
import NavButton from "./components/NavButton/NavButton";
import Home from "./pages/Home/Home";
import KataElim from "./pages/KataElim/KataElim";
import KataFinal from "./pages/KataFinal/KataFinal";
import Kumite from "./pages/Kumite/Kumite";
import TeamKumite from "./pages/TeamKumite/TeamKumite";
import { useEffect, useState, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import TeamKata from "./pages/TeamKata/TeamKata";
import Login from "./pages/Login/Login";
import GroupDraw from "./pages/GroupDraw/GroupDraw";
import MatchesDraw from "./pages/MatchesDraw/MatchesDraw";
import Credits from "./pages/Credits/Credits";
import CustomNotification from "./components/CustomNotification/CustomNotification";
import Kihon from "./pages/Kihon/Kihon";
import { selectElement } from "./utils";

function App() {
  const [theme, setTheme] = useState("dark");
  // console.log(theme);
  const [tatami, setTatami] = useState("");
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
    matchtype: true,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationBody, setNotificationBody] = useState("");
  const [showClassification, setShowClassification] = useState(false);
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
    kihon: false,
    kumite: false,
    teamKumite: false,
    credits: false,
  });
  const [modality, setModality] = useState("default");
  const [matchType, setMatchType] = useState("default");
  const compRef = useRef(null);
  const kataRef = useRef(null);
  const teamRef = useRef(null);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
    if (theme === "dark") {
      document.documentElement.style.setProperty(
        "--theme-background-color",
        "rgb(192, 192, 192)"
      );
      document.documentElement.style.setProperty(
        "--theme-navBar-color",
        "rgba(192, 192, 192, 0.8)"
      );
      document.documentElement.style.setProperty(
        "--theme-text-color",
        "rgb(39, 39, 39)"
      );
      document.documentElement.style.setProperty(
        "--theme-icons-color",
        "rgb(39, 39, 39)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--theme-background-color",
        "black"
      );
      document.documentElement.style.setProperty(
        "--theme-navBar-color",
        "rgba(0, 0, 0, 0.8)"
      );
      document.documentElement.style.setProperty("--theme-text-color", "white");
      document.documentElement.style.setProperty(
        "--theme-icons-color",
        "white"
      );
    }
  };

  // useEffect(() => {toggleTheme()});

  useEffect(() => {
    setIsDefault({ category: true, modality: true, matchtype: true });
    setModality("default");
    setMatchType("default");
    selectElement("typeList", "default");
    if (
      !currentPage.groupDraw ||
      !currentPage.elimDraw ||
      !currentPage.matchesDraw
    ) {
      setCategory("default");
    }
    setShowClassification(false);
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
            theme={theme}
            setTeams={setTeams}
            setKatas={setKatas}
            blinking={blinking}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setShowNotification={setShowNotification}
            setNotificationTitle={setNotificationTitle}
            setNotificationBody={setNotificationBody}
            compRef={compRef}
            teamRef={teamRef}
            kataRef={kataRef}
          ></NavBar>
        </div>
      ) : (
        ""
      )}
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
        <Route
          path="/home"
          element={
            <Home
              theme={theme}
              setTheme={setTheme}
              toggleTheme={toggleTheme}
            ></Home>
          }
        ></Route>
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
              matchType={matchType}
              setMatchType={setMatchType}
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
              compRef={compRef}
              teamRef={teamRef}
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
              modality={modality}
              setModality={setModality}
              matchType={matchType}
              setMatchType={setMatchType}
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
              compRef={compRef}
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
              tatami={tatami}
              setTatami={setTatami}
              competitors={competitors}
              katas={katas}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              setBlinking={setBlinking}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              category={category}
              setCategory={setCategory}
              matchType={matchType}
              setMatchType={setMatchType}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
              compRef={compRef}
              kataRef={kataRef}
            ></KataElim>
          }
        ></Route>
        <Route
          path="/katafinal"
          element={
            <KataFinal
              match="katafinal"
              tatami={tatami}
              setTatami={setTatami}
              competitors={competitors}
              katas={katas}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              setBlinking={setBlinking}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              category={category}
              setCategory={setCategory}
              matchType={matchType}
              setMatchType={setMatchType}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
              showClassification={showClassification}
              setShowClassification={setShowClassification}
              compRef={compRef}
              kataRef={kataRef}
            ></KataFinal>
          }
        ></Route>
        <Route
          path="/teamkata"
          element={
            <TeamKata
              match="teamkata"
              tatami={tatami}
              setTatami={setTatami}
              katas={katas}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
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
              showClassification={showClassification}
              setShowClassification={setShowClassification}
              kataRef={kataRef}
            ></TeamKata>
          }
        ></Route>
        <Route
          path="/kihon"
          element={
            <Kihon
              match="kihon"
              tatami={tatami}
              setTatami={setTatami}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              modality={modality}
              setModality={setModality}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={setNotificationBody}
              setNotificationBody={setNotificationBody}
            ></Kihon>
          }
        ></Route>
        <Route
          path="/kumite"
          element={
            <Kumite
              match="kumite"
              tatami={tatami}
              setTatami={setTatami}
              competitors={competitors}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              setBlinking={setBlinking}
              category={category}
              setCategory={setCategory}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              modality={modality}
              setModality={setModality}
              matchType={matchType}
              setMatchType={setMatchType}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
              compRef={compRef}
            ></Kumite>
          }
        ></Route>
        <Route
          path="/teamkumite"
          element={
            <TeamKumite
              match="teamkumite"
              tatami={tatami}
              setTatami={setTatami}
              competitors={competitors}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              setBlinking={setBlinking}
              category={category}
              setCategory={setCategory}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              modality={modality}
              setModality={setModality}
              matchType={matchType}
              setMatchType={setMatchType}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              notificationTitle={notificationTitle}
              setNotificationTitle={setNotificationTitle}
              notificationBody={notificationBody}
              setNotificationBody={setNotificationBody}
              compRef={compRef}
            ></TeamKumite>
          }
        ></Route>
        <Route path="/credits" element={<Credits></Credits>}></Route>
      </Routes>
    </div>
  );
}

export default App;
