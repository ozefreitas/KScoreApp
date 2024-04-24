import NavBar from "./components/NavBar";
import NavButton from "./components/NavButton";
import Home from "./pages/Home";
import KataElim from "./pages/KataElim/KataElim";
import KataFinal from "./pages/KataFinal/KataFinal";
import Kumite from "./pages/Kumite/Kumite";
import TeamKumite from "./pages/TeamKumite/TeamKumite";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import TeamKata from "./pages/TeamKata/TeamKata";
import Login from "./pages/Login/Login";
import GroupDraw from "./pages/GroupDraw/GroupDraw";
import MatchesDraw from "./pages/MatchesDraw/MatchesDraw";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [competitors, setCompetitors] = useState([]);
  const [katas, setKatas] = useState([]);
  const [isPinRight, setIsPinRight] = useState(false);

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
            <GroupDraw competitors={competitors} draw="group"></GroupDraw>
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
              competitors={competitors}
              katas={katas}
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
            ></KataFinal>
          }
        ></Route>
        <Route
          path="/teamkata"
          element={<TeamKata match="teamkata" katas={katas}></TeamKata>}
        ></Route>
        <Route
          path="/kumite"
          element={<Kumite match="kumite" competitors={competitors}></Kumite>}
        ></Route>
        <Route
          path="/teamkumite"
          element={
            <TeamKumite
              match="teamkumite"
              competitors={competitors}
            ></TeamKumite>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
