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
  const [newCompetitors, setNewCompetitors] = useState([]);
  const [groupByComp, setGroupByComp] = useState([]);
  const [katas, setKatas] = useState([]);
  const [category, setCategory] = useState("default");
  const [blinking, setBlinking] = useState({ comp: false, kata: false });
  const [isPinRight, setIsPinRight] = useState(false);
  const [isDefault, setIsDefault] = useState(true);
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

  const mergeCompetitors = (jsonResources) => {
    const groupedCompetitors = {};
    jsonResources.forEach((resource) => {
      const key = `${resource.number}-${resource.name}-${resource.team}`;
      if (groupedCompetitors[key]) {
        groupedCompetitors[key].category.push(resource.category);
      } else {
        groupedCompetitors[key] = {
          ...resource,
          category: [resource.category],
        };
      }
    });
    const mergedCompetitors = Object.values(groupedCompetitors);
    return mergedCompetitors;
  };

  useEffect(() => {
    setNewCompetitors(mergeCompetitors(competitors));
  }, [competitors]);

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
              competitors={newCompetitors}
              draw="elimination"
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              blinking={blinking}
              setBlinking={setBlinking}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              category={category}
              setCategory={setCategory}
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
              competitors={newCompetitors}
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
              competitors={newCompetitors}
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
              competitors={newCompetitors}
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
              competitors={newCompetitors}
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
              competitors={newCompetitors}
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
