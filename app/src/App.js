import Header from "./components/Header";
import "./app.css";
import CompCard from "./components/CompCard";
import { useState, useEffect } from "react";

function App() {
  const [competitors, setCompetitors] = useState([]);
  const [katas, setKatas] = useState([]);

  useEffect(() => {
    const fetchCompetitors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/competitors");
        if (!response.ok) {
          throw new Error("Failed to fetch competitors");
        }
        const data = await response.json();
        setCompetitors(data);
      } catch (error) {
        console.log("respota deu ou nao deu");
        console.error("Error fetching competitors:", error);
      }
    };
    const fetchKatas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/kataname");
        if (!response.ok) {
          throw new Error("Failed to fetch katas");
        }
        const data = await response.json();
        setKatas(data);
      } catch (error) {
        console.error("Error fetching katas:", error);
      }
    };
    fetchKatas();
    fetchCompetitors();
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <CompCard competitors={competitors} katas={katas}></CompCard>
    </div>
  );
}

export default App;
