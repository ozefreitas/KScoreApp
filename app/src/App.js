import Header from "./components/Header";
import "./app.css";
import CompCard from "./components/CompCard";
import { useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [competitors, setCompetitors] = useState([]);
  const [katas, setKatas] = useState([]);

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></Header>
      <NavBar
        isMenuOpen={isMenuOpen}
        setCompetitors={setCompetitors}
        setKatas={setKatas}
      ></NavBar>
      {console.log(katas)}
      <CompCard competitors={competitors} katas={katas}></CompCard>
    </div>
  );
}

export default App;
