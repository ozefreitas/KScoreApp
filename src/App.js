import NavBar from "./components/NavBar";
import NavButton from "./components/NavButton";
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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [competitors, setCompetitors] = useState([]);
  const [newCompetitors, setNewCompetitors] = useState([]);
  const [katas, setKatas] = useState([]);
  const [isPinRight, setIsPinRight] = useState(false);

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
          ></NavButton>
          <NavBar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            setCompetitors={setCompetitors}
            setKatas={setKatas}
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
          path="/groupdraw"
          element={
            <GroupDraw competitors={newCompetitors} draw="group"></GroupDraw>
          }
        ></Route>
        <Route
          path="/matchesdraw"
          element={<MatchesDraw draw="matches"></MatchesDraw>}
        ></Route>
        <Route
          path="/kataelim"
          element={
            <KataElim
              match="kata"
              competitors={newCompetitors}
              katas={katas}
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
            ></KataFinal>
          }
        ></Route>
        <Route
          path="/teamkata"
          element={<TeamKata match="teamkata" katas={katas}></TeamKata>}
        ></Route>
        <Route
          path="/kumite"
          element={<Kumite match="kumite" competitors={newCompetitors}></Kumite>}
        ></Route>
        <Route
          path="/teamkumite"
          element={
            <TeamKumite
              match="teamkumite"
              competitors={newCompetitors}
            ></TeamKumite>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
