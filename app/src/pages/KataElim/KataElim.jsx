import Header from "../../components/Header";
import CompCard from "./CompCard/CompCard";

export default function KataElim({ competitors, katas }) {
  return (
    <div>
      <Header match="kata"></Header>
      <CompCard competitors={competitors} katas={katas}></CompCard>
    </div>
  );
}
