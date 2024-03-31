import NavBar from "./components/NavBar";
import NavButton from "./components/NavButton";
import Home from "./pages/Home";
import KataElim from "./pages/KataElim/KataElim";
import KataFinal from "./pages/KataFinal/KataFinal";
import Kumite from "./pages/Kumite/Kumite";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import TeamKata from "./pages/TeamKata/TeamKata";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [competitors, setCompetitors] = useState([]);
  const [katas, setKatas] = useState([]);

  return (
    <div className="App">
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
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/kataelim"
          element={
            <KataElim competitors={competitors} katas={katas}></KataElim>
          }
        ></Route>
        <Route
          path="/katafinal"
          element={
            <KataFinal competitors={competitors} katas={katas}></KataFinal>
          }
        ></Route>
        <Route
          path="/teamkata"
          element={<TeamKata katas={katas}></TeamKata>}
        ></Route>
        <Route
          path="/kumite"
          element={<Kumite competitors={competitors}></Kumite>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
