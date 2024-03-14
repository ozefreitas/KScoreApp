import Header from "./components/Header";
import "./app.css";
import CompCard from "./components/CompCard";
import { useState, useEffect } from "react";

function App() {
  const [competitors, setCompetitors] = useState([]);

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
        console.error("Error fetching competitors:", error);
      }
    };

    fetchCompetitors();
  }, []);

  return (
    <div className="App">
      {/* {competitors.map((competitor) => (
        <li key={competitor.id}>{competitor.name}</li>
      ))} */}
      <Header></Header>
      <CompCard competitors={competitors}></CompCard>
    </div>
  );
}

export default App;
