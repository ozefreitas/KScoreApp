import Header from "../../components/Header";
import CompCard from "./CompCard/CompCard";

export default function KataElim({ match, competitors, katas }) {
  return (
    <div>
      <Header match="kata"></Header>
      <CompCard match={match} competitors={competitors} katas={katas}></CompCard>
    </div>
  );
}
