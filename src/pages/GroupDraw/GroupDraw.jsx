import Header from "../../components/Header";
// import styles from "./gourpdraw.module.css";
import CompetitorList from "./CompetitorList/CompetitorList";
import { useState } from "react";

export default function GroupDraw({ draw, competitors }) {
  const [category, setCategory] = useState(null);
  return (
    <div>
      <Header
        draw={draw}
        category={category}
        setCategory={setCategory}
      ></Header>
      <CompetitorList
        competitors={competitors}
        category={category}
      ></CompetitorList>
    </div>
  );
}
