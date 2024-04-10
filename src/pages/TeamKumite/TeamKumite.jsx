import Kumite from "../Kumite/Kumite";

export default function TeamKumite({ competitors, match }) {
  return (
    <div>
      <Kumite match={match} competitors={competitors}></Kumite>
    </div>
  );
}
